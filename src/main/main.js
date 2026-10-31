const { app, BrowserWindow } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 850,
    minHeight: 600,
    autoHideMenuBar: true,
<<<<<<< Updated upstream
    backgroundColor: '#0B0B12',
=======
    backgroundColor: '#00000000',
     titleBarStyle: 'hidden',
     titleBarOverlay: {          
    color: '#0B0B12',        
    symbolColor: '#ffffff',
    height: 40                
  },
>>>>>>> Stashed changes
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});