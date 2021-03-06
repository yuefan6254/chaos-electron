import path from 'path';
import { app, BrowserWindow } from 'electron';
import { registerWindowStateChangeActions, registerWindowStateChangedEvents } from './ipc/index';
const isDev = process.env.ENV === 'development';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      enableWebSQL: false,
      nativeWindowOpen: true
    }
  })
  
  // 关闭自带菜单栏
  mainWindow.setMenuBarVisibility(false);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.resolve(__dirname, './dist/index.html'))
  }

  // 添加window状态监听
  registerWindowStateChangedEvents(mainWindow);
  registerWindowStateChangeActions(mainWindow);

  // 添加快捷键

}

app.once('ready', createWindow);
app.on('window-all-closed', () => app.quit());