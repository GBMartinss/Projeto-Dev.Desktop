
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const iconPath = path.join(__dirname, '../assets/icon.ico');
if (process.platform === 'win32') {
  app.setAppUserModelId('com.taskly.app');
}
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 850,
    minHeight: 600,
    transparent: true,
    autoHideMenuBar: true,
    frame: false,
    backgroundColor: '#00000000',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setIcon(iconPath);
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}
ipcMain.on('window-close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});
ipcMain.on('window-minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});
ipcMain.on('window-maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  if (!win) return;

  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
