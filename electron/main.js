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
    }
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

    const proc = spawn('wsl.exe', ['-e', 'bash', '-c', `bash "${scriptPath}" ${command}`], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    })

    let output = ''
    proc.stdout.on('data', d => output += d.toString())
    proc.stderr.on('data', d => output += d.toString())

    proc.on('close', (code) => {
      resolve({ success: code === 0, output })
    })

    // Unref supaya Electron ga nunggu process ini
    proc.unref()
  })
})
// Stream log real-time
ipcMain.on('server:stream-log', (event, { scriptPath }) => {
  const proc = spawn('wsl', ['bash', scriptPath, 'logs'])
  proc.stdout.on('data', (data) => {
    event.sender.send('log:data', data.toString())
  })
})

app.whenReady().then(createWindow)