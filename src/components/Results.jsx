import { TrendingUp, Building, DollarSign, Percent, Home, Database } from 'lucide-react'

export default function Results({ result }) {
  if (!result) return null
  const { summary } = result

  const Item = ({ label, value, icon: Icon }) => (
    <div className="rounded-xl bg-slate-900/60 border border-slate-700/60 p-4">
      <div className="flex items-center gap-3 text-blue-200/90">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value ?? '—'}</div>
    </div>
  )

  return (
    <section className="mt-8">
      <div className="grid md:grid-cols-3 gap-4">
        <Item label="Units" value={summary.units_total} icon={Building} />
        <Item label="Occupancy" value={
          typeof summary.occupancy_rate === 'number' ? `${(summary.occupancy_rate*100).toFixed(1)}%` : '—'
        } icon={Home} />
        <Item label="Avg Rent" value={typeof summary.avg_rent === 'number' ? `$${summary.avg_rent.toLocaleString()}` : '—'} icon={DollarSign} />
        <Item label="T12 Income" value={typeof summary.t12_income === 'number' ? `$${summary.t12_income.toLocaleString()}` : '—'} icon={TrendingUp} />
        <Item label="T12 Expense" value={typeof summary.t12_expense === 'number' ? `$${summary.t12_expense.toLocaleString()}` : '—'} icon={Database} />
        <Item label="NOI" value={typeof summary.noi === 'number' ? `$${summary.noi.toLocaleString()}` : '—'} icon={DollarSign} />
        <Item label="Cap Rate" value={typeof summary.cap_rate === 'number' ? `${(summary.cap_rate*100).toFixed(2)}%` : '—'} icon={Percent} />
        <Item label="DSCR" value={summary.dscr} icon={Percent} />
        <Item label="OM Price Hint" value={typeof summary.om_price_hint === 'number' ? `$${summary.om_price_hint.toLocaleString()}` : '—'} icon={DollarSign} />
      </div>

      <div className="mt-6 rounded-xl bg-slate-800/60 border border-blue-500/20 p-4">
        <div className="text-blue-200/80 text-sm">Files received</div>
        <pre className="mt-2 text-xs text-blue-100/80 whitespace-pre-wrap break-words">{JSON.stringify(summary.files, null, 2)}</pre>
      </div>
    </section>
  )
}
