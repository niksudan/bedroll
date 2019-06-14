import * as menubar from 'menubar';
import * as BasecampOAuth2 from 'electron-oauth2-basecamp';
import * as fs from 'fs';
import * as path from 'path';
import * as electron from 'electron';
import * as moment from 'moment';

require('dotenv').config();

const TOKEN_PATH = 'token.json';

const basecampOAuth2 = new BasecampOAuth2({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'https://www.forge.uk',
});

const mb = menubar({
  preloadWindow: true,
  height: 600,
});

let accessToken;

mb.on('after-create-window', async () => {
  mb.window.openDevTools();
  mb.window.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
  if (accessToken === undefined) {
    accessToken = await getAccessToken();
  }
  mb.window.loadURL(`file://${path.join(__dirname, '..')}/app.html`);
});

mb.on('ready', () => {
  mb.tray.setImage(path.join(__dirname, 'icons/icon-dark.png'));
  if (electron.systemPreferences.isDarkMode()) {
    mb.tray.setImage(path.join(__dirname, 'icons/icon-light.png'));
  }
});

/**
 * Get Basecamp access token
 */
const getAccessToken = async () => {
  let token;

  // Load token from storage
  if (fs.existsSync(TOKEN_PATH)) {
    console.log('Token detected');
    token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

    // Refresh if expired
    if (token.expiry_time && token.expiry_time <= moment().unix()) {
      console.log('Token has expired - refreshing token');
      token = await basecampOAuth2.refreshToken(token.refresh_token);
      storeAccessToken(token);
    }

    // Request a new token if no token detected
  } else {
    console.log('No token detected - requesting a new one');
    token = await basecampOAuth2.requestToken();
    storeAccessToken(token);
  }

  return token;
};

/**
 * Store Basecamp access token to storage
 * @param {Object} token
 */
const storeAccessToken = (token) => {
  token.expiry_time = token.expires_in + moment().unix();
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
};
