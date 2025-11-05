export default function Courses() {
  const demo = [
    { id: 1, title: 'DSA Bootcamp', progress: 60 },
    { id: 2, title: 'React Mastery', progress: 30 },
  ]
  return (
    <div>
      <h2 className="text-lg font-semibold">Course List</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {demo.map(c => (
          <div key={c.id} className="card">
            <p className="font-medium">{c.title}</p>
            <div className="mt-2 h-2 rounded bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded bg-brand" style={{ width: `${c.progress}%` }} />
            </div>
            <p className="text-xs mt-1">{c.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  )
}


