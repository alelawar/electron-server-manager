import { useState } from 'react'

export default function AddServerModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '',
    scriptPath: '',
    publicUrl: '',
    port: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!form.name.trim()) return setError('Server name is required')
    if (!form.scriptPath.trim()) return setError('Script path is required')
    if (!form.port || isNaN(Number(form.port))) return setError('Valid port is required')

    onAdd({
      name: form.name.trim(),
      scriptPath: form.scriptPath.trim(),
      port: Number(form.port),
    })
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#161b27] border border-[#252d3d] rounded-2xl w-[420px] shadow-2xl fade-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e2535]">
          <div>
            <h2 className="text-sm font-semibold text-[#e2e8f0]">Add Server</h2>
            <p className="text-[11px] text-[#475569] mt-0.5">Register a new WSL server script</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#475569] hover:text-[#e2e8f0] hover:bg-[#252d3d] transition-all"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11"/>
              <line x1="11" y1="1" x2="1" y2="11"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4" onKeyDown={handleKey}>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Server Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. RKP Gaji"
              value={form.name}
              onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setError('') }}
              className="w-full bg-[#0f1117] border border-[#252d3d] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#2a3347] focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Script Path <span className="text-[#2a3347]">(WSL path)</span>
            </label>
            <input
              type="text"
              placeholder="/home/username/my-server.sh"
              value={form.scriptPath}
              onChange={e => { setForm(p => ({ ...p, scriptPath: e.target.value })); setError('') }}
              className="w-full bg-[#0f1117] border border-[#252d3d] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#2a3347] focus:outline-none focus:border-blue-500/60 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Public URL <span className="text-[#2a3347]"></span>
            </label>
            <input
              type="text"
              placeholder="https://server-dsdm-ipb.vercel.app"
              value={form.publicUrl}
              onChange={e => { setForm(p => ({ ...p, publicUrl: e.target.value })); setError('') }}
              className="w-full bg-[#0f1117] border border-[#252d3d] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#2a3347] focus:outline-none focus:border-blue-500/60 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Port
            </label>
            <input
              type="number"
              placeholder="8000"
              value={form.port}
              onChange={e => { setForm(p => ({ ...p, port: e.target.value })); setError('') }}
              className="w-full bg-[#0f1117] border border-[#252d3d] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#2a3347] focus:outline-none focus:border-blue-500/60 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#475569] hover:text-[#e2e8f0] hover:bg-[#252d3d] rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            Add Server
          </button>
        </div>
      </div>
    </div>
  )
}