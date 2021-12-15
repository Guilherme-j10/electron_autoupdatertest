const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

const createNewBrowserWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 700,
    frame: true,
    show: false,
    title: 'Cloud Call - Agente',
    titleBarOverlay: 'Cloud Call - Agente',
    titleBarStyle: 'Cloud Call - Agente',
    icon: path.resolve(__dirname, '.', 'megaconecta.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    }
  });

  const StartSource = isDev ? 'http://localhost:3234' : `file://${path.join(__dirname, './index.html')}`

  mainWindow.menuBarVisible = false;
  mainWindow.loadURL(StartSource);

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createNewBrowserWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createNewBrowserWindow();
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('get_version_app', (event) => {
  event.sender.send('get_version_app', app.getVersion());
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-availiable');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});