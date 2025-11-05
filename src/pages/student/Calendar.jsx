import { useEffect, useMemo, useState } from 'react'

function buildMonth(start = new Date()) {
  const year = start.getFullYear()
  const month = start.getMonth()
  const first = new Date(year, month, 1)
  const firstDay = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))
  return days
}

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [days, setDays] = useState([])
  const [cursor, setCursor] = useState(new Date())

  useEffect(() => {
    setDays(buildMonth(cursor))
  }, [cursor])

  useEffect(() => {
    const base = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    setEvents([
      { id: 1, date: new Date(base).toDateString(), title: 'Sprint Planning' },
      { id: 2, date: new Date(base.getFullYear(), base.getMonth(), 10).toDateString(), title: 'Interview Prep' },
      { id: 3, date: new Date().toDateString(), title: 'Today Focus' },
    ])
  }, [cursor])

  const monthLabel = useMemo(() => cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' }), [cursor])
  const todayStr = new Date().toDateString()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Calendar</h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline" onClick={()=>setCursor(new Date(cursor.getFullYear(), cursor.getMonth()-1, 1))}>Prev</button>
          <div className="text-sm text-gray-600 dark:text-gray-300 min-w-32 text-center">{monthLabel}</div>
          <button className="btn btn-outline" onClick={()=>setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+1, 1))}>Next</button>
          <button className="btn btn-primary" onClick={()=>setCursor(new Date())}>Today</button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(h => (
          <div key={h} className="text-xs text-slate-500">{h}</div>
        ))}
        {days.map((d, idx) => (
          <div key={idx} className={`min-h-24 p-2 border rounded ${d && d.toDateString()===todayStr ? 'border-[color:var(--color-brand)]' : 'border-slate-200 dark:border-slate-800'}`}>
            <div className={`text-xs ${d && d.toDateString()===todayStr ? 'text-[color:var(--color-brand)] font-medium' : 'text-slate-500'}`}>{d?.getDate?.()}</div>
            <div className="mt-1 space-y-1">
              {events.filter(e => d && e.date === d.toDateString()).map(e => (
                <div key={e.id} className="text-xs px-1 py-0.5 rounded bg-[color:var(--color-brand-light)]/30 text-gray-800 dark:text-gray-100">{e.title}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


