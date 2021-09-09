import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as http from 'http';
import express from 'express';

const appServer = express();
appServer.use(express.static(path.join(__dirname, '')));

appServer.get('*', (req:any, res:any) => {
    res.sendFile(__dirname+'/index.html');
});

http.createServer(appServer).listen(3007, function() {
    console.log('Express server listening on port');
});

let win: BrowserWindow;
console.log(__dirname);


function createWindow() {
  win = new BrowserWindow({ width: 800, height: 800, frame: true,
    webPreferences:{
      nativeWindowOpen: true,
    },
    icon: __dirname + '../dist/assets/logos/gigwork-logo.svg',
    // icon: __dirname + 'logos/gigwork-logo.svg',
  });


  win.loadURL(
    "http://localhost:3007"
  );

  win.setIcon(__dirname + '/assets/logos/gigworks.png')
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});