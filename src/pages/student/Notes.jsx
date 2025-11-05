import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Notes() {
  const [value, setValue] = useState('')
  const editorRef = useRef(null)
  const starter = useSelector((s)=> s.workspace.currentNoteContent)

  useEffect(() => {
    if (starter && starter.length > 0) {
      setValue(starter)  // load template content
    } else {
      setValue('# Welcome to Notospace\n\nUse headings, code blocks, and more.')
    }
  }, [starter])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button className="btn btn-primary" onClick={() => editorRef.current?.focus?.()}>Focus Editor</button>
        <button className="btn btn-outline" onClick={() => setValue('')}>Clear</button>
      </div>
      <div className="card">
        <ReactQuill ref={editorRef} theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  )
}
