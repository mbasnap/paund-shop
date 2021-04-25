import { app, BrowserWindow, Menu, ipcMain, ipcRenderer } from "electron"
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow, workerWindow

const workURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/static/assets/worker.html`
  : `file://${__dirname}/static/assets/worker.html`

const getUrl = (path = '') => {
  const baseUrl = `http://localhost:9080` + path
  const fileUrl = `file://${__dirname}` + (path || '/index.html')
  return process.env.NODE_ENV === 'development' ? baseUrl : fileUrl
}

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nativeWindowOpen: true,
      nodeIntegration: true
    },
    height: 563,
    width: 1000,
    useContentSize: true,
    show: true
  })
  mainWindow.loadURL(getUrl()) 
  mainWindow.on('closed', () => mainWindow = null)
  workerWindow = new BrowserWindow({ 
    show: false,
    webPreferences: { webSecurity: false, nodeIntegration: true },
    protocol: 'file',
    parent:mainWindow
  })
  workerWindow.loadURL(workURL)
  // workerWindow.loadURL(getUrl('worker.html'))
  Menu.setApplicationMenu( null)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('print', (_, v) => {
  workerWindow.webContents.send('print', v)
})

ipcMain.on('readyToPrint', (_, v) => {
  const { size, silent } = v  
  workerWindow.webContents.insertCSS(`@media print { @page {size: ${ size }} }`)
  workerWindow.webContents.print({ silent, landscape: size === 'landscape' }, (err, data) => {
    mainWindow.webContents.send('print-end')
  })
})