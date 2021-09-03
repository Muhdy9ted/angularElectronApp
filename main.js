const { app, BrowserWindow, protocol } = require('electron');
var url = require('url');
const path = require('path');


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        },
        // frame: false
    })
  
    // win.loadURL('http://localhost:4200');
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/gigworks-desktop/index.html'),
        protocol: 'file:',
        slashes: true
    }))

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})