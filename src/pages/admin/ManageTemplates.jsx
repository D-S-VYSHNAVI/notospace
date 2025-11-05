import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTemplate, removeTemplate } from '../../redux/templatesSlice'

export default function ManageTemplates() {
  const items = useSelector((s) => s.templates.items)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Study')

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content Management</h2>
      <div className="card max-w-xl">
        <div className="flex flex-wrap gap-2">
          <input className="form-input flex-1 min-w-40" placeholder="Template title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <select className="form-input md:w-40" value={category} onChange={(e)=>setCategory(e.target.value)}>
            {['Study','Project','Career','Personal','CRM','Journal','Planner','Budget'].map(c=> <option key={c}>{c}</option>)}
          </select>
          <button className="btn btn-primary" onClick={()=>{ if(title.trim()){ dispatch(addTemplate({ title, category, description: 'Custom template' })); setTitle('') } }}>Add</button>
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-3">
        {items.map(t => (
          <li key={t.id} className="card flex items-center justify-between">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-gray-500">{t.category}</p>
            </div>
            <button className="btn btn-outline" onClick={()=>dispatch(removeTemplate(t.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


