export default function Interview() {
  const qas = [
    { q: 'Explain closures in JS', a: 'A closure is...' },
    { q: 'What is memoization?', a: 'Caching function results.' },
  ]
  return (
    <div>
      <h2 className="text-lg font-semibold">Interview Prep Hub</h2>
      <div className="mt-4 space-y-3">
        {qas.map((x,i)=>(
          <div key={i} className="card">
            <p className="font-medium">{x.q}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{x.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


