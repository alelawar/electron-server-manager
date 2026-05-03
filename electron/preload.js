const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  runCommand: (scriptPath, command) =>
    ipcRenderer.invoke('server:command', { scriptPath, command }),
  streamLogs: (scriptPath) =>
    ipcRenderer.send('server:stream-log', { scriptPath }),
  onLogData: (callback) =>
    ipcRenderer.on('log:data', (_, data) => callback(data)),

  close: () => ipcRenderer.send('window:close'),
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
})