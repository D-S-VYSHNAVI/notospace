export default function AdminReports() {
  const logs = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    time: new Date(Date.now() - i * 3600_000).toLocaleString(),
    level: ['info', 'warn', 'error'][i % 3],
    message: ['User login', 'Template created', 'Rate limit', 'Signup', 'Export'][i % 5],
  }))

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Reports & Logs</h2>
      <div className="card">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Recent events</p>
          <button className="btn btn-outline btn-sm">Export CSV</button>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Level</th>
                <th className="px-3 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-3 py-2 whitespace-nowrap">{l.time}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      l.level === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                      l.level === 'warn' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                    }`}>{l.level}</span>
                  </td>
                  <td className="px-3 py-2">{l.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


