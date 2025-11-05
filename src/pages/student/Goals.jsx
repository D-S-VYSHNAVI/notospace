import { useState } from 'react'

export default function Goals() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Crack DSA round', progress: 40 },
    { id: 2, title: 'Publish portfolio', progress: 10 },
  ])

  return (
    <div>
      <h2 className="text-lg font-semibold">Goals & Progress</h2>
      <div className="mt-4 space-y-3">
        {goals.map(g => (
          <div key={g.id} className="card">
            <div className="flex items-center justify-between">
              <p className="font-medium">{g.title}</p>
              <input type="number" min={0} max={100} className="w-20 bg-transparent border border-slate-300 dark:border-slate-700 rounded px-2 py-1" value={g.progress} onChange={(e)=>setGoals(s=>s.map(x=>x.id===g.id?{...x,progress:Number(e.target.value)}:x))} />
            </div>
            <div className="mt-2 h-2 rounded bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded bg-brand" style={{ width: `${g.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


