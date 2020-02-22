import { app, BrowserWindow, Menu, ipcMain, shell} from "electron"
// import PouchDB from 'pouchdb-browser'
// const db = new PouchDB('http://localhost:5984/ps')
// db.info().then(console.log).catch(console.error)


    

const menuTemplate = require('./menuTemplate');
// const os = require("os")
// const fs = require("fs")
// const path = require("path")

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, workerWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const workURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/static/assets/worker.html`
  : `file://${__dirname}/static/assets/worker.html`

function createWindow ( ddd ) {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nativeWindowOpen: true,
      nodeIntegration: true
    },
    height: 563,
    width: 1000,
    useContentSize: true,
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.custom = { db: ddd }
  workerWindow = new BrowserWindow({ 
    show: false,
    webPreferences: { webSecurity: false, nodeIntegration: true },
    protocol: 'file',
    parent:mainWindow
  })
  workerWindow.webContents.openDevTools()
  workerWindow.loadURL(workURL)
  // workerWindow.on("closed", () => {
  //   workerWindow = undefined;
  // })
}
app.on('ready', async () => {

    


  createWindow()
  Menu.setApplicationMenu( Menu.buildFromTemplate( menuTemplate() ))
  mainWindow.webContents.openDevTools();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



app.on('activate', () => {
  if (mainWindow === null) {
    createWindow('sddsds')
  }
})

ipcMain.on("show-zvit", (v) => {
  mainWindow.webContents.send('show-zvit', v)
})

ipcMain.on('print', (e, v) => {
  
  workerWindow.webContents.send('print', v)
})

ipcMain.on('readyToPrint', ({ sender }, v) => {
  // console.log('print');
  const { size, zoom, silent } = v  
  workerWindow.webContents.insertCSS(`@media print { @page {size: ${ size }} }`)
  workerWindow.webContents.print({ silent, landscape: size === 'landscape' })
  // sender.send('wrote-pdf', 'pdfPath')
})