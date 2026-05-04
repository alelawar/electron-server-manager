import { useState } from 'react'

function StatusBadge({ status }) {
  if (status === 'running') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse" />
        Running
      </span>
    )
  }
  if (status === 'loading') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 pulse" />
        Loading...
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-[#475569] bg-[#1e2535] px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[#2a3347]" />
      Stopped
    </span>
  )
}

export default function ServerCard({ server, onCommand, onOpenLogs, onRemove }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const isRunning = server.status === 'running'
  const isLoading = server.status === 'loading'

  return (
    <div className="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 hover:border-[#2a3347] transition-all group">
      <div className="flex items-start justify-between gap-4">

        {/* Left: Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
            isRunning ? 'bg-blue-600/20' : 'bg-[#1e2535]'
          }`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={isRunning ? '#3b82f6' : '#475569'}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>

          {/* Name + path */}
          <div className="min-w-0">
            <p className="font-medium text-[#e2e8f0] text-sm">{server.name}</p>
            <p className="text-[11px] text-[#475569] mt-0.5 truncate font-mono">{server.scriptPath}</p>
            {isRunning && (
              <p className="text-[11px] text-blue-400/70 mt-0.5 select-text">
                localhost:{server.port}
                <br />
                public: {server.publicUrl || 'N/A'}
              </p>
            )}
          </div>
        </div>

        {/* Right: Status + Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge status={server.status} />

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">

            {/* Start / Stop */}
            {!isRunning ? (
              <button
                disabled={isLoading}
                onClick={() => onCommand(server, 'start')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-all"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1.5l7 3.5-7 3.5V1.5z"/>
                </svg>
                Start
              </button>
            ) : (
              <button
                disabled={isLoading}
                onClick={() => onCommand(server, 'stop')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 hover:bg-red-500/25 disabled:opacity-40 disabled:cursor-not-allowed text-red-400 text-xs font-medium rounded-lg transition-all"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                  <rect width="8" height="8" rx="1"/>
                </svg>
                Stop
              </button>
            )}

            {/* Restart */}
            <button
              disabled={isLoading || !isRunning}
              onClick={() => onCommand(server, 'restart')}
              title="Restart"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#e2e8f0] hover:bg-[#252d3d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 7a6 6 0 1 0 1.5-4"/>
                <polyline points="1,1 1,4 4,4"/>
              </svg>
            </button>

            {/* Logs */}
            <button
              onClick={() => onOpenLogs(server)}
              title="View logs"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#e2e8f0] hover:bg-[#252d3d] transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 3h10M2 7h7M2 11h5"/>
              </svg>
            </button>

            {/* Delete */}
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                title="Remove server"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1,3 13,3"/>
                  <path d="M5 3V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"/>
                  <path d="M11 3l-.7 9a1 1 0 0 1-1 .9H4.7a1 1 0 0 1-1-.9L3 3"/>
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onRemove(server.id)}
                  className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-all font-medium"
                >
                  Remove
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-[10px] px-2 py-1 bg-[#252d3d] text-[#64748b] hover:bg-[#2a3347] rounded transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}