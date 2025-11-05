import { useState } from 'react'

export default function Planner() {
  const [week, setWeek] = useState([
    { day: 'Mon', plan: 'Revise graphs' },
    { day: 'Tue', plan: 'React project' },
    { day: 'Wed', plan: 'Leetcode 5 Qs' },
    { day: 'Thu', plan: 'Read docs' },
    { day: 'Fri', plan: 'Team sync' },
    { day: 'Sat', plan: 'Mock interview' },
    { day: 'Sun', plan: 'Rest / plan' },
  ])

  return (
    <div>
      <h2 className="text-lg font-semibold">Weekly Planner</h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {week.map((d, i) => (
          <div key={i} className="card">
            <p className="text-xs text-slate-500">{d.day}</p>
            <textarea className="mt-2 w-full bg-transparent outline-none text-sm" value={d.plan} onChange={(e)=>setWeek(s=>s.map((x,idx)=>idx===i?{...x,plan:e.target.value}:x))} />
          </div>
        ))}
      </div>
    </div>
  )
}


