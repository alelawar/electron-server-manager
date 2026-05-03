function StatusDot({ status }) {
  if (status === 'running') {
    return (
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse shrink-0" />
    )
  }
  if (status === 'loading') {
    return (
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 pulse shrink-0" />
    )
  }
  return <span className="w-1.5 h-1.5 rounded-full bg-[#2a3347] shrink-0" />
}

export default function Sidebar({
  servers,
  activeView,
  activeServer,
  onNavigate,
  onSelectServer,
  onAddServer,
}) {
  const runningCount = servers.filter(s => s.status === 'running').length

  return (
    <aside className="w-56 bg-[#0a0d14] border-r border-[#1e2535] flex flex-col shrink-0">
      {/* Nav */}
      <nav className="p-3 space-y-0.5">
        <p className="text-[10px] font-semibold text-[#475569] uppercase tracking-widest px-2 py-2">
          Navigation
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
            activeView === 'dashboard' && !activeServer
              ? 'bg-blue-600/15 text-blue-400'
              : 'text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#161b27]'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.8"/>
          </svg>
          Dashboard
          {runningCount > 0 && (
            <span className="ml-auto text-[10px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded-full font-semibold">
              {runningCount}
            </span>
          )}
        </button>
      </nav>

      <div className="mx-3 h-px bg-[#1e2535]" />

      {/* Servers list */}
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-[10px] font-semibold text-[#475569] uppercase tracking-widest px-2 py-2">
          Servers
        </p>

        <div className="space-y-0.5">
          {servers.map((server, i) => (
            <button
              key={server.id}
              onClick={() => onSelectServer(server)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`slide-in w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all text-left ${
                activeServer?.id === server.id
                  ? 'bg-blue-600/15 text-blue-400'
                  : 'text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#161b27]'
              }`}
            >
              <StatusDot status={server.status} />
              <span className="truncate flex-1">{server.name}</span>
              <span className="text-[10px] text-[#475569]">:{server.port}</span>
            </button>
          ))}

          {servers.length === 0 && (
            <p className="text-[#475569] text-xs px-2 py-3">No servers yet</p>
          )}
        </div>
      </div>

      {/* Add server button */}
      <div className="p-3 border-t border-[#1e2535]">
        <button
          onClick={onAddServer}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[#2a3347] text-[#475569] hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-600/5 transition-all text-sm"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13"/>
            <line x1="1" y1="7" x2="13" y2="7"/>
          </svg>
          Add Server
        </button>
      </div>
    </aside>
  )
}