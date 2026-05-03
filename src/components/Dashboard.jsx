import ServerCard from './ServerCard.jsx'

export default function Dashboard({ servers, onCommand, onOpenLogs, onRemove, onAddServer }) {
  const running = servers.filter(s => s.status === 'running').length
  const stopped = servers.filter(s => s.status === 'stopped').length

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#1e2535] shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#e2e8f0]">Dashboard</h1>
            <p className="text-sm text-[#475569] mt-0.5">
              Manage your WSL servers
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse" />
              <span className="text-[#64748b]">{running} running</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#2a3347]" />
              <span className="text-[#64748b]">{stopped} stopped</span>
            </div>
            <button
              onClick={onAddServer}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="7" y1="1" x2="7" y2="13"/>
                <line x1="1" y1="7" x2="13" y2="7"/>
              </svg>
              Add Server
            </button>
          </div>
        </div>
      </div>

      {/* Server grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {servers.length === 0 ? (
          <EmptyState onAdd={onAddServer} />
        ) : (
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
            {servers.map((server, i) => (
              <div
                key={server.id}
                className="fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ServerCard
                  server={server}
                  onCommand={onCommand}
                  onOpenLogs={onOpenLogs}
                  onRemove={onRemove}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4 pb-20">
      <div className="w-16 h-16 rounded-2xl bg-[#161b27] border border-[#1e2535] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      </div>
      <div>
        <p className="text-[#e2e8f0] font-medium">No servers yet</p>
        <p className="text-[#475569] text-sm mt-1">Add your first WSL server to get started</p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all"
      >
        Add Server
      </button>
    </div>
  )
}