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

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, webPreferences:{
      nativeWindowOpen: true,
  } });

  win.loadURL(
    "http://localhost:3007"
  );

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