import { useEffect, useReducer, useState } from 'react'

function tasksReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: crypto.randomUUID(), text: action.text, done: false, status: 'todo' }]
    case 'toggle':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    case 'delete':
      return state.filter(t => t.id !== action.id)
    case 'edit':
      return state.map(t => t.id === action.id ? { ...t, text: action.text } : t)
    case 'move':
      return state.map(t => t.id === action.id ? { ...t, status: action.status } : t)
    default:
      return state
  }
}

export default function Tasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [text, setText] = useState('')
  const columns = [
    { key: 'todo', title: 'To Do' },
    { key: 'doing', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ]

  useEffect(() => {
    dispatch({ type: 'add', text: 'Complete assignment' })
    dispatch({ type: 'add', text: 'Revise algorithms' })
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold">Tasks</h2>
      <div className="mt-4 flex gap-2">
        <input className="form-input flex-1" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Add a new task" />
        <button className="btn btn-primary" onClick={()=>{ if(text.trim()){ dispatch({type:'add', text}); setText('') }}}>Add</button>
      </div>

      {/* List */}
      <ul className="mt-4 space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="card flex items-center gap-2">
            <input type="checkbox" checked={t.done} onChange={()=>dispatch({type:'toggle', id:t.id})} />
            <input className={`flex-1 bg-transparent outline-none ${t.done?'line-through text-gray-400':''}`} value={t.text} onChange={(e)=>dispatch({type:'edit', id:t.id, text:e.target.value})} />
            <select className="form-input md:w-32" value={t.status} onChange={(e)=>dispatch({type:'move', id:t.id, status:e.target.value})}>
              {columns.map(c=> <option key={c.key} value={c.key}>{c.title}</option>)}
            </select>
            <button className="btn btn-outline" onClick={()=>dispatch({type:'delete', id:t.id})}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Kanban */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col.key} className="card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{col.title}</p>
              <span className="text-xs text-gray-400">{tasks.filter(t=>t.status===col.key).length}</span>
            </div>
            <div className="mt-3 space-y-2">
              {tasks.filter(t=>t.status===col.key).map(t => (
                <div key={t.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between">
                  <span className={`text-sm ${t.done?'line-through text-gray-400':''}`}>{t.text}</span>
                  <div className="flex items-center gap-2">
                    {col.key!=='todo' && <button className="btn btn-ghost btn-sm" onClick={()=>dispatch({type:'move', id:t.id, status:'todo'})}>To Do</button>}
                    {col.key!=='doing' && <button className="btn btn-ghost btn-sm" onClick={()=>dispatch({type:'move', id:t.id, status:'doing'})}>Doing</button>}
                    {col.key!=='done' && <button className="btn btn-ghost btn-sm" onClick={()=>dispatch({type:'move', id:t.id, status:'done'})}>Done</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


