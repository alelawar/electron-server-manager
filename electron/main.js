const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const { exec, spawn } = require('child_process')
const path = require('path')


let mainWindow, tray

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    frame: false,
  })

  // Dev: load Vite dev server | Prod: load built file
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

// Jalanin command WSL
ipcMain.handle('server:command', async (event, { scriptPath, command }) => {
  return new Promise((resolve) => {
    // Pakai wsl.exe dengan flag --exec supaya session-nya persist
    exec(
      `wsl.exe bash -ic "bash '${scriptPath}' ${command}"`,
      { timeout: 15000 },
      (err, stdout, stderr) => {
        resolve({ success: !err, output: stdout || stderr })
      }
    )

  })
})
// Stream log real-time
ipcMain.on('server:stream-log', (event, { scriptPath }) => {
  const proc = spawn('wsl', ['bash', scriptPath, 'logs'])
  proc.stdout.on('data', (data) => {
    event.sender.send('log:data', data.toString())
  })
})

// ✅ HANDLE WINDOW CONTROL
ipcMain.on('window:close', () => {
  mainWindow.close()
})

ipcMain.on('window:minimize', () => {
  mainWindow.minimize()
})

ipcMain.on('window:maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})

ipcMain.on('window:close-and-shutdown', () => {
  // Jalanin wsl --shutdown as administrator
  exec(
    'powershell.exe -Command "Start-Process wsl.exe -ArgumentList \'--shutdown\' -Verb RunAs -Wait"',
    { timeout: 30000 },
    (err) => {
      // Tutup app regardless berhasil atau gagal
      mainWindow.destroy()
      app.quit()
    }
  )
})

app.whenReady().then(createWindow)