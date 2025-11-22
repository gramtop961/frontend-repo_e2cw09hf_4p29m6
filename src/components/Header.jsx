import { Building2, LineChart, ShieldCheck } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative py-10">
      <div className="text-center">
        <div className="inline-flex items-center justify-center mb-6 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-400/20">
          <Building2 className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Property Package Analyzer
        </h1>
        <p className="mt-3 text-blue-200/80">
          Upload a Rent Roll, T12, and/or OM to generate an instant underwriting snapshot
        </p>
        <div className="mt-6 flex items-center justify-center gap-6 text-blue-200/70 text-sm">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Bank-friendly</div>
          <div className="flex items-center gap-2"><LineChart className="w-4 h-4"/> Investor-grade</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/> Secure</div>
        </div>
      </div>
    </header>
  )
}
