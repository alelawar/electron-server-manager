import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import LogViewer from './components/LogViewer.jsx'
import AddServerModal from './components/AddServerModal.jsx'
import Titlebar from './components/Titlebar.jsx'

// Mock data — nanti diganti dari config.json via electronAPI
const INITIAL_SERVERS = [
  {
    id: '1',
    name: 'RKP Gaji',
    scriptPath: '/home/ahmad_lesmana/rkp-gaji.sh',
    port: 8000,
    publicUrl: 'https://server-dsdm-ipb.vercel.app',
    status: 'stopped', // 'running' | 'stopped' | 'loading'
  },
]

export default function App() {
  const [servers, setServers] = useState(INITIAL_SERVERS)
  const [activeView, setActiveView] = useState('dashboard') // 'dashboard' | 'logs'
  const [activeServer, setActiveServer] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [logs, setLogs] = useState({}) // { [serverId]: string[] }

  const updateServerStatus = (id, status) => {
    setServers(prev =>
      prev.map(s => s.id === id ? { ...s, status } : s)
    )
  }

  const addServer = (server) => {
    const newServer = {
      ...server,
      id: Date.now().toString(),
      status: 'stopped',
    }
    setServers(prev => [...prev, newServer])
    setShowAddModal(false)
  }

  const removeServer = (id) => {
    setServers(prev => prev.filter(s => s.id !== id))
    if (activeServer?.id === id) {
      setActiveServer(null)
      setActiveView('dashboard')
    }
  }

  const appendLog = (serverId, line) => {
    setLogs(prev => ({
      ...prev,
      [serverId]: [...(prev[serverId] || []), line]
    }))
  }

  const openLogs = (server) => {
    setActiveServer(server)
    setActiveView('logs')
  }

  const handleCommand = async (server, command) => {
    updateServerStatus(server.id, 'loading')

    // Append log header
    appendLog(server.id, `\n▶ Running: ${command.toUpperCase()}\n`)

    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.runCommand(server.scriptPath, command)
        appendLog(server.id, result.output)
        if (command === 'start') updateServerStatus(server.id, result.success ? 'running' : 'stopped')
        if (command === 'stop') updateServerStatus(server.id, 'stopped')
        if (command === 'restart') updateServerStatus(server.id, result.success ? 'running' : 'stopped')
      } else {
        // Dev fallback (browser)
        await new Promise(r => setTimeout(r, 1200))
        appendLog(server.id, `[mock] Command '${command}' executed on ${server.name}\n`)
        if (command === 'start') updateServerStatus(server.id, 'running')
        if (command === 'stop') updateServerStatus(server.id, 'stopped')
        if (command === 'restart') updateServerStatus(server.id, 'running')
      }
    } catch (err) {
      appendLog(server.id, `Error: ${err.message}\n`)
      updateServerStatus(server.id, 'stopped')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0f1117] text-[#e2e8f0] overflow-hidden">
      <Titlebar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          servers={servers}
          activeView={activeView}
          activeServer={activeServer}
          onNavigate={setActiveView}
          onSelectServer={(server) => {
            setActiveServer(server)
            setActiveView('logs')
          }}
          onAddServer={() => setShowAddModal(true)}
        />

        <main className="flex-1 overflow-hidden">
          {activeView === 'dashboard' && (
            <Dashboard
              servers={servers}
              onCommand={handleCommand}
              onOpenLogs={openLogs}
              onRemove={removeServer}
              onAddServer={() => setShowAddModal(true)}
            />
          )}
          {activeView === 'logs' && activeServer && (
            <LogViewer
              server={activeServer}
              logs={logs[activeServer.id] || []}
              onClear={() => setLogs(prev => ({ ...prev, [activeServer.id]: [] }))}
              onBack={() => setActiveView('dashboard')}
            />
          )}
        </main>
      </div>

      {showAddModal && (
        <AddServerModal
          onAdd={addServer}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}