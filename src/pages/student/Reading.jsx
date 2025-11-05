import { useEffect, useState } from 'react'

export default function Reading() {
  const [list, setList] = useState([])
  useEffect(() => {
    setList([
      { id: 1, title: 'Clean Code', link: '#' },
      { id: 2, title: 'You Don’t Know JS', link: '#' },
    ])
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold">Reading List</h2>
      <ul className="mt-4 space-y-2">
        {list.map(i => (
          <li key={i.id} className="card flex items-center justify-between">
            <span>{i.title}</span>
            <div className="flex items-center gap-2">
              <a className="btn btn-outline" href={i.link}>Open</a>
              <button className="btn btn-outline" onClick={()=>setList(s=>s.filter(x=>x.id!==i.id))}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


