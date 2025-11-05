export default function AdminDashboard() {
  const cards = [
    { title: 'Active Students', value: 128 },
    { title: 'Templates', value: 100 },
    { title: 'New Signups', value: 12 },
  ]
  const week = Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 100) + 20)
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c,i)=> (
          <div key={i} className="card">
            <p className="text-sm text-gray-500">{c.title}</p>
            <p className="text-2xl font-bold mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Signups over time</p>
            <span className="text-xs text-gray-500">Last 12 weeks</span>
          </div>
          <div className="mt-4 flex items-end gap-2 h-40">
            {week.map((v, i) => (
              <div key={i} className="flex-1 bg-brand-500/20 rounded-t">
                <div className="w-full bg-brand-500 rounded-t" style={{height: `${(v/140)*100}%`}} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">System health</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>API latency</span>
              <span className="text-green-600">120ms</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Error rate</span>
              <span className="text-green-600">0.2%</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Uptime</span>
              <span className="text-green-600">99.9%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


