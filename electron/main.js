const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js',
            webSecurity: false,
            contextIsolation: false
        }
    });
    console.log(`__dirname is: ${__dirname}`)
    mainWindow.loadURL(
        !app.isPackaged
            ? process.env.ELECTRON_START_URL
            : url.format({
                pathname: path.join(__dirname, '../index.html'),
                protocol: 'file:',
                slashes: true,
            })
    );

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('drive:selected', (event, drive) => {
    console.log(`Event: ${event.processId} and the drive was : ${drive}`)
});

/*
ipcMain.on() to recieve from UI
mainWindow.webContents.send  to send to UI
*/