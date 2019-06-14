import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as find from 'lodash.find';
import * as findIndex from 'lodash.findindex';
import * as moment from 'moment';
import store from './redux';
import {
  authenticate,
  fetchTodos,
  updateTimestamp,
  requestTodos,
  receiveTodos,
  setRefresh,
} from './redux/actions';
import Wrapper from './components/Wrapper';
import './scss/style.scss';

/**
 * Minutes taken until an automatic refresh
 */
const REFRESH_TIME = 0.5;

/**
 * Load new todos and update existing todos
 */
store.dispatch(
  setRefresh(async () => {
    store.dispatch(requestTodos());
    const state = store.getState() as any;
    const lastUpdated = state.app.lastUpdated;
    const accountID = state.app.account.id;
    const newItems = await store.dispatch(fetchTodos(accountID) as any);
    let items = state.app.items;
    let newItemCount = 0,
      updatedItemCount = 0;

    // If we haven't got any items, set them to the newly fetched ones
    if (items.length === 0) {
      items = newItems;
      newItemCount = items.length;
    }

    // Check if we need to insert or update any items
    if (lastUpdated !== false) {
      newItems.reverse().forEach((item, index) => {
        const oldItem = find(items, { id: item.id });
        if (oldItem === undefined) {
          items.unshift(item);
          newItemCount++;
        } else if (moment(item.updated_at).isAfter(oldItem.updated_at)) {
          const index = findIndex(items, { id: item.id });
          items[index] = item;
          updatedItemCount++;
        }
      });
    }

    // Update the item state
    store.dispatch(receiveTodos(items));
    if (newItemCount > 0) {
      console.log(`Inserted ${newItemCount} item(s)`);
    }
    if (updatedItemCount > 0) {
      console.log(`Updated ${updatedItemCount} item(s)`);
    }

    // Update reference
    store.dispatch(updateTimestamp());
  }),
);

// Execute main logic
store.dispatch(authenticate() as any).then(() => {
  const state = store.getState() as any;
  state.app.refresh();
});

// Render application
render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('app'),
);
