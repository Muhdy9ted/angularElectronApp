"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var electron_1 = require("electron");
var path = tslib_1.__importStar(require("path"));
var http = tslib_1.__importStar(require("http"));
var express_1 = tslib_1.__importDefault(require("express"));
var appServer = express_1.default();
appServer.use(express_1.default.static(path.join(__dirname, '')));
appServer.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
http.createServer(appServer).listen(3007, function () {
    console.log('Express server listening on port');
});
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 800, frame: false,
        webPreferences: {
            nativeWindowOpen: true,
        } });
    win.loadURL("http://localhost:3007");
    win.webContents.openDevTools();
    win.on("closed", function () {
        win = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map