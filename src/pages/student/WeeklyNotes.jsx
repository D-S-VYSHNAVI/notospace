import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import toast from 'react-hot-toast'

export default function WeeklyNotes() {
  const [value, setValue] = useState('')
  const editorRef = useRef(null)

  useEffect(() => {
    const start = new Date()
    const week = getWeekRange(start)
    setValue(`# Weekly Notes (${week.label})\n\n- Plan your week\n- Track tasks and highlights\n\n## Highlights\n\n`)
  }, [])

  const getWeekRange = (date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Monday as first
    const monday = new Date(date.setDate(diff))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    const fmt = (d) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    return { label: `${fmt(monday)} - ${fmt(sunday)}` }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button className="btn btn-primary" onClick={() => editorRef.current?.focus?.()}>Focus</button>
        <button className="btn btn-outline" onClick={() => {navigator.clipboard.writeText(value); toast.success('Copied to clipboard')}}>Copy</button>
      </div>
      <div className="card">
        <ReactQuill ref={editorRef} theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  )
}


