import { useState } from 'react'
import { UploadCloud, FileSpreadsheet, FileText, FileSearch, Loader2 } from 'lucide-react'

export default function UploadForm({ onResult }) {
  const [rentRoll, setRentRoll] = useState(null)
  const [t12, setT12] = useState(null)
  const [om, setOm] = useState(null)
  const [propertyName, setPropertyName] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!rentRoll && !t12 && !om) {
      setError('Please upload at least one file to start the analysis.')
      return
    }

    const formData = new FormData()
    if (propertyName) formData.append('property_name', propertyName)
    if (purchasePrice) formData.append('purchase_price', purchasePrice)
    if (rentRoll) formData.append('rent_roll', rentRoll)
    if (t12) formData.append('t12', t12)
    if (om) formData.append('om', om)

    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Upload failed' }))
        throw new Error(err.detail || 'Upload failed')
      }

      const data = await res.json()
      onResult?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const baseInput = 'block w-full text-sm text-blue-100/90 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer'

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-2">Property name</label>
          <input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} placeholder="e.g., Lakeside Apartments"
            className="w-full rounded-md bg-slate-900/60 border border-slate-700/60 px-3 py-2 text-blue-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">Purchase price (optional)</label>
          <input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="e.g., 12500000"
            className="w-full rounded-md bg-slate-900/60 border border-slate-700/60 px-3 py-2 text-blue-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="group">
          <label className="block text-sm text-blue-200 mb-2">Rent Roll (CSV/XLSX/PDF)</label>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
            <FileSpreadsheet className="w-5 h-5 text-blue-300" />
            <input type="file" onChange={(e) => setRentRoll(e.target.files?.[0] || null)} className={baseInput} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">T12 (CSV/XLSX/PDF)</label>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
            <FileText className="w-5 h-5 text-blue-300" />
            <input type="file" onChange={(e) => setT12(e.target.files?.[0] || null)} className={baseInput} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-2">OM (PDF)</label>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
            <FileSearch className="w-5 h-5 text-blue-300" />
            <input type="file" onChange={(e) => setOm(e.target.files?.[0] || null)} className={baseInput} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded p-3">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2.5 transition disabled:opacity-60">
        {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <UploadCloud className="w-4 h-4"/>}
        {loading ? 'Analyzing…' : 'Analyze Property'}
      </button>
    </form>
  )
}
