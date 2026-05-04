import { useState } from "react";

export default function Titlebar() {
  const [showConfirm, setShowConfirm] = useState(false)

  const minimize = () => window.electronAPI?.minimize?.();
  const maximize = () => window.electronAPI?.maximize?.();
  const handleClose = () => setShowConfirm(true);
  const close = () => window.electronAPI?.close?.();
  const confirmClose = () => window.electronAPI?.closeAndShutdown?.()

  return (
    <div className="titlebar h-10 bg-[#0a0d14] flex items-center justify-between px-4 border-b border-[#1e2535] shrink-0 z-50">
      {/* Left: App identity */}
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect
              x="1"
              y="1"
              width="4"
              height="4"
              rx="0.8"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="7"
              y="1"
              width="4"
              height="4"
              rx="0.8"
              fill="white"
              opacity="0.5"
            />
            <rect
              x="1"
              y="7"
              width="4"
              height="4"
              rx="0.8"
              fill="white"
              opacity="0.5"
            />
            <rect
              x="7"
              y="7"
              width="4"
              height="4"
              rx="0.8"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#94a3b8] tracking-wide">
          WSL Server Manager
        </span>
      </div>

      {/* Right: Window controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={minimize}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2535] transition-all"
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
            <rect width="10" height="2" rx="1" />
          </svg>
        </button>
        <button
          onClick={maximize}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2535] transition-all"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1.5" />
          </svg>
        </button>
        <button
          onClick={handleClose}
          className="w-7 h-7 rounded flex items-center justify-center text-[#64748b] hover:text-white hover:bg-red-500 transition-all"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-[#161b27] border border-[#1e2535] rounded-xl p-6 w-80 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#e2e8f0]">
                  Tutup Aplikasi?
                </p>
                <p className="text-xs text-[#475569] mt-0.5">
                  Semua server WSL akan dimatikan
                </p>
              </div>
            </div>

            <p className="text-xs text-[#64748b] bg-[#0f1117] rounded-lg px-3 py-2.5 mb-4 font-mono">
              wsl --shutdown
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-3 py-2 text-xs text-[#64748b] bg-[#1e2535] hover:bg-[#252d3d] rounded-lg transition-all"
              >
                Batal
              </button>
              <button
                onClick={confirmClose}
                className="flex-1 px-3 py-2 text-xs font-medium text-white bg-red-500 hover:bg-red-400 rounded-lg transition-all"
              >
                Shutdown & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
