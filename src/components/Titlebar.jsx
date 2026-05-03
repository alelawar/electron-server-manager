export default function Titlebar() {
  const minimize = () => window.electronAPI?.minimize?.()
  const maximize = () => window.electronAPI?.maximize?.()
  const close = () => window.electronAPI?.close?.()

  return (
    <div className="titlebar h-10 bg-[#0a0d14] flex items-center justify-between px-4 border-b border-[#1e2535] shrink-0 z-50">
      {/* Left: App identity */}
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="4" height="4" rx="0.8" fill="white" opacity="0.9"/>
            <rect x="7" y="1" width="4" height="4" rx="0.8" fill="white" opacity="0.5"/>
            <rect x="1" y="7" width="4" height="4" rx="0.8" fill="white" opacity="0.5"/>
            <rect x="7" y="7" width="4" height="4" rx="0.8" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#94a3b8] tracking-wide">WSL Server Manager</span>
      </div>

      {/* Right: Window controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={minimize}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2535] transition-all"
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
            <rect width="10" height="2" rx="1"/>
          </svg>
        </button>
        <button
          onClick={maximize}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2535] transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1.5"/>
          </svg>
        </button>
        <button
          onClick={close}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-white hover:bg-red-500 transition-all"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="9" y2="9"/>
            <line x1="9" y1="1" x2="1" y2="9"/>
          </svg>
        </button>
      </div>
    </div>
  )
}