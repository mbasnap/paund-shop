import {app, BrowserWindow, Menu, ipcMain, shell} from "electron"
const menuTemplate = require('./menuTemplate');
const os = require("os")
const fs = require("fs")
const path = require("path")

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, workerWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const workURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/static/assets/worker.html`
  : `file://${__dirname}/worker.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nativeWindowOpen: true
    },
    height: 563,
    width: 1000,
    useContentSize: true,
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  // mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  //   if (frameName === 'modal') {
  //     // открыть окно как модальное
  //     event.preventDefault()
  //     Object.assign(options, {
  //       modal: true,
  //       parent: mainWindow,
  //       width: 100,
  //       height: 100
  //     })
  //     event.newGuest = new BrowserWindow(options)
  //   }
  // })
  workerWindow = new BrowserWindow({ 
    // show: false,
    webPreferences: { webSecurity: false },
    protocol: 'file',
    // height: 1000,
    // width: 1000,

    parent:mainWindow
  })
  workerWindow.webContents.openDevTools()
  workerWindow.loadURL(workURL)
  workerWindow.on("closed", () => {
    workerWindow = undefined;
})
}
app.on('ready', () => {
  createWindow()
  Menu.setApplicationMenu( Menu.buildFromTemplate( menuTemplate() ))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on("print-to-pdf", (event, content) => {
//   const pdf = path.join(os.tmpdir(), 'print.pdf')
//   const win = BrowserWindow.fromWebContents(event.sender)
//   win.webContents.printToPDF({}, (err, data) => {
//     if(err) return console.log(err.message);
//     fs.writeFile(pdf, data, (err) => {
//       if(err) return console.log(err.message);
//       shell.openExternal('file://' + pdf)
//       event.sender.send('wrote-pdf', pdf)
//     })
//   })
// })

// ipcMain.on("printPDF", (event, content) => {
//   workerWindow.webContents.send("printPDF", content);
// })

ipcMain.on("show-zvit", (v) => {
  mainWindow.webContents.send('show-zvit', v)
})


// ipcMain.on("readyToPrintPDF", (event) => {
//   const pdfPath = path.join(os.tmpdir(), 'print.pdf');
//   // Use default printing options
//   workerWindow.webContents.printToPDF({}, function (error, data) {
//       if (error) throw error
//       fs.writeFile(pdfPath, data, function (error) {
//           if (error) {
//               throw error
//           }
//           shell.openItem(pdfPath)
//           event.sender.send('wrote-pdf', pdfPath)
//       })
//   })
// })

ipcMain.on('print', (e, content) => {
  workerWindow.webContents.send('print', content)
  // workerWindow.webContents.insertCSS('@media print {html, body {zoom: 130%;}');
})
ipcMain.on('readyToPrint', ({ sender }) => {
  workerWindow.webContents.print({})
  sender.send('wrote-pdf', 'pdfPath')
})