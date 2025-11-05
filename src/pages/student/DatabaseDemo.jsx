import { useMemo, useState } from 'react'

export default function DatabaseDemo() {
  const [filter, setFilter] = useState('')
  const [stage, setStage] = useState('Todo')
  const [rows, setRows] = useState([
    { id: 1, title: 'Build landing', tag: 'UI', stage: 'Todo' },
    { id: 2, title: 'Write reducer', tag: 'Code', stage: 'Doing' },
    { id: 3, title: 'Calendar events', tag: 'Feature', stage: 'Done' },
  ])

  const filtered = useMemo(() => rows.filter(r => r.title.toLowerCase().includes(filter.toLowerCase())), [rows, filter])
  const stages = ['Todo','Doing','Done']

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <input className="rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2" placeholder="Filter by title" value={filter} onChange={(e)=>setFilter(e.target.value)} />
        <button className="btn btn-outline" onClick={()=>setFilter('')}>Clear</button>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Tag</th>
              <th className="px-3 py-2">Stage</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2">{r.tag}</td>
                <td className="px-3 py-2">{r.stage}</td>
                <td className="px-3 py-2 text-right">
                  <select className="bg-transparent border border-slate-300 dark:border-slate-700 rounded px-2 py-1" value={stage} onChange={(e)=>setStage(e.target.value)}>
                    {stages.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <button className="btn btn-outline ml-2" onClick={()=>setRows(rs=>rs.map(x=>x.id===r.id?{...x, stage}:x))}>Move</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stages.map(s => (
          <div key={s} className="card min-h-40">
            <p className="font-medium">{s}</p>
            <div className="mt-2 space-y-2">
              {rows.filter(r=>r.stage===s).map(r=> (
                <div key={r.id} className="p-2 rounded border border-slate-200 dark:border-slate-800">{r.title}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


