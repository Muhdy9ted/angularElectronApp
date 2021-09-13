const { app, BrowserWindow, protocol, Menu, ipcMain } = require('electron');
var url = require('url');
const path = require('path');
let addWindow;
var win;

// process.env.NODE_ENV = 'production'

function createWindow () {
    // console.log(__dirname+'/assets/logos/gigwork-logo.svg')
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            nodeIntegration: true,
            nativeWindowOpen: true,
            contextIsolation: false,
        },
        frame: false
    })
  
    // win.loadURL('http://localhost:4200');
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/gigworks-desktop/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.setIcon(path.join(__dirname,'/assets/logos/gigwork-logo.svg'))

    //quit other windows when app when closed
    win.on('close', function(){
        app.quit();
    })

}

app.whenReady().then(() => {
    createWindow()

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert the menu
    Menu.setApplicationMenu(mainMenu)
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Add shopping list item',
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            nodeIntegration: true,
            nativeWindowOpen: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        frame: false,
        alwaysOnTop: true
    })
  
    // win.loadURL('http://localhost:4200');
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/gigworks-desktop/addWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function clearAddedItem(){
    win.webContents.send('item:clear')
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

//create menu template
const mainMenuTemplate = [
    {
        label: 'file',
        submenu:[
            { label: 'Add Items', click(){createAddWindow()} },
            {type: 'separator'},
            { label: 'Clear Items', click(){clearAddedItem()} },
            {type: 'separator'},
            { label: 'Quit', accelerator: process.platform == 'darwin' ? 'Command+Q' : 'ctrl+Q', click(){app.quit()}}
        ]
    }
];

//if mac add empty object to menu
if(process.platform === 'darwin'){
    mainMenuTemplate.unshift({})
}

//add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools', 
        submenu:[
            {label: 'Toggle DevTools', accelerator: process.platform == 'darwin' ? 'Command+I' : 'ctrl+I', click(item, focusedWindow){ focusedWindow.toggleDevTools()}},
            {role: 'reload'}
        ]
    })
}

//catch item:add event from addWindow.html's form
ipcMain.on('item:add', function(e, item){
    // console.log(item)
    //send it to the mainwindow
    win.webContents.send('item:add', item)
    addWindow.close()
})