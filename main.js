// Modules to control application life and create native browser window
const { app, BrowserWindow} = require('electron');
const path = require('path');
const isDev = process.env.ENV === 'development';
const {registerWindowStateChangeActions,registerWindowStateChangedEvents} = require('./ipc/index');

function createWindow() {
  const mainWindow = new BrowserWindow({width: 800,height: 600,titleBarStyle: 'customButtonsOnHover',frame: false, webPreferences: {nodeIntegration: true,webviewTag: true, enableWebSQL: false, nativeWindowOpen: true }})
  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools({mode: 'detach'});
  } else{
    mainWindow.loadFile(path.resolve(__dirname,'./dist/index.html'))
  }

  registerWindowStateChangedEvents(mainWindow);
  registerWindowStateChangeActions(mainWindow);
  
}

app.once('ready', createWindow);
app.on('window-all-closed', () => app.quit());  