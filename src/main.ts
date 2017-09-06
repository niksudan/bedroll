import * as menubar from 'menubar';
import * as BasecampOAuth2 from 'electron-oauth2-basecamp';
import * as fs from 'fs';
import * as path from 'path';
import * as electron from 'electron';

require('dotenv').config();

const TOKEN_PATH = 'token.json';

const basecampOAuth2 = new BasecampOAuth2({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'https://www.digital-results.com',
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

/**
 * Get Basecamp access token
 */
const getAccessToken = async () => {
  if (fs.existsSync(TOKEN_PATH)) {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  }
  const token = await basecampOAuth2.requestToken();
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  return token;
}
