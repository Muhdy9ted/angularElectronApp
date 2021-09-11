import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as http from 'http';
import express from 'express';
import { fork } from 'child_process';



const appServer = express();
appServer.use(express.static(path.join(__dirname, '')));

appServer.get('*', (req:any, res:any) => {
    res.sendFile(__dirname+'/index.html');
});

http.createServer(appServer).listen(3007, function() {
    console.log('Express server listening on port');
});

let win: BrowserWindow;

const child = fork(path.join(__dirname + '/file-upload.js'), ['child']);

function createWindow() {
  win = new BrowserWindow({ minWidth: 500, minHeight: 742, width: 500, height: 742, frame: true,
    webPreferences:{
      nativeWindowOpen: true,
      nodeIntegration: true,
    },
    icon: __dirname + '../dist/assets/logos/gigwork-logo.svg',
    // icon: __dirname + 'logos/gigwork-logo.svg',
  });



  win.loadURL(
    "http://localhost:3007"
  );

  win.setIcon(__dirname + '/assets/logos/gigworks.png');
  win.setMenu(null);
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  
}

app.on("ready", (event, launchInfo) => {
      createWindow();
      
});


 app.on('browser-window-focus', ()=> {
  win.webContents
      .executeJavaScript('localStorage.getItem("user");', true)
      .then(result => {
        if (result){
          const data = JSON.parse(result);
          const uuid = data['user']['uid'];
          child.send({ 'id': uuid, 'path':  app.getPath('userData')});
        }
      });
 })

app.on("activate", () => {
  console.log('here')

  if (win === null) {

    createWindow();
  } 
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    // childProcess.kill('SIGKILL');
  }
});
