import { useEffect, useRef } from 'react'

function colorizeLog(line) {
  // Simple ANSI-ish coloring based on content
  if (line.includes('✓') || line.includes('success') || line.includes('started') || line.includes('running')) {
    return 'text-green-400'
  }
  if (line.includes('✗') || line.includes('error') || line.includes('Error') || line.includes('failed')) {
    return 'text-red-400'
  }
  if (line.includes('⚠') || line.includes('warn') || line.includes('Warning')) {
    return 'text-yellow-400'
  }
  if (line.includes('▶') || line.includes('Running:')) {
    return 'text-blue-400'
  }
  if (line.includes('[mock]')) {
    return 'text-purple-400'
  }
  return 'text-[#94a3b8]'
}

function stripAnsi(str) {
  return str.replace(/\x1B\[[0-9;]*[mGKHF]/g, '')
    .replace(/\u001b\[[0-9;]*[mGKHF]/g, '')
    .replace(/\[[\d;]*m/g, '') // fallback
}

export default function LogViewer({ server, logs, onClear, onBack }) {
  const bottomRef = useRef(null)

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const allLines = logs.join('').split('\n').map(stripAnsi)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1e2535] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#e2e8f0] hover:bg-[#1e2535] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,2 4,7 9,12"/>
            </svg>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#e2e8f0]">{server.name}</h2>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                server.status === 'running'
                  ? 'bg-green-400/10 text-green-400'
                  : 'bg-[#1e2535] text-[#475569]'
              }`}>
                {server.status}
              </span>
            </div>
            <p className="text-[11px] text-[#475569] font-mono mt-0.5">{server.scriptPath}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#475569]">{allLines.length} lines</span>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#475569] hover:text-[#e2e8f0] hover:bg-[#1e2535] rounded-lg transition-all"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,3 13,3"/>
              <path d="M5 3V2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"/>
              <path d="M11 3l-.7 9a1 1 0 0 1-1 .9H4.7a1 1 0 0 1-1-.9L3 3"/>
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div className="flex-1 overflow-y-auto bg-[#0a0d14] p-5 log-terminal select-text">
        {allLines.length === 0 || (allLines.length === 1 && allLines[0] === '') ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#2a3347] text-sm">No logs yet — start the server to see output</p>
          </div>
        ) : (
          <>
            {allLines.map((line, i) => (
              <div key={i} className={`leading-relaxed ${colorizeLog(line)}`}>
                {line === '' ? <br /> : (
                  <span>
                    <span className="text-[#2a3347] mr-3 select-none text-[10px]">
                      {String(i + 1).padStart(3, ' ')}
                    </span>
                    {line}
                  </span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Footer bar */}
      <div className="h-6 bg-[#0a0d14] border-t border-[#1e2535] px-5 flex items-center gap-4 shrink-0">
        <span className="text-[10px] text-[#2a3347]">
          Port: <span className="text-[#475569]">{server.port}</span>
        </span>
        <span className="text-[10px] text-[#2a3347]">
          Script: <span className="text-[#475569] font-mono">{server.scriptPath.split('/').pop()}</span>
        </span>
      </div>
    </div>
  )
}