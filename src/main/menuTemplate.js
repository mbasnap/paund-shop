const electron = require('electron');

const {app, shell, ipcMain} = electron;

let menuTemplate = function() {
    return [
        {
            label: 'Zvit',
            submenu: [
              {
                label: 'Kassa',
                click: function () {
                  ipcMain.emit('show-zvit', 'Kassa') // In such way we can trigger function in the main process
                }
              },
              {
                label: 'Reload', accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                  focusedWindow.reload(); // reload the page
                }
              }
            ]
        }        
    ]
}
module.exports = menuTemplate