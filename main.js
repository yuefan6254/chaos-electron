// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({width: 800,height: 600, webPreferences: {nodeIntegration: true,webviewTag: true, enableWebSQL: false, nativeWindowOpen: true }})
  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else{
    mainWindow.loadFile(path.resolve(__dirname,'./dist/index.html'))
  }
  mainWindow.once('closed', () => mainWindow = null);
}

app.once('ready', createWindow);
app.on('window-all-closed', () => app.quit());