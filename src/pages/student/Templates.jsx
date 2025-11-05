import { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentNoteContent } from '../../redux/workspaceSlice'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, X, Save, Layout, FileText, Calendar, CheckSquare, Database } from 'lucide-react'

export default function Templates() {
  const templates = useSelector((s) => s.templates.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState('grid')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    category: 'Notes',
    description: '',
    content: ''
  })
  const [myTemplates, setMyTemplates] = useState([])
  const [activeTab, setActiveTab] = useState('all')

  // Load user templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('userTemplates')
    if (savedTemplates) setMyTemplates(JSON.parse(savedTemplates))
  }, [])

  // Save custom templates to localStorage
  useEffect(() => {
    localStorage.setItem('userTemplates', JSON.stringify(myTemplates))
  }, [myTemplates])

  // Combine default and custom templates
  const allTemplates = useMemo(() => {
    // Ensure every template has a content field
    const defaultTemplates = templates.map(t => ({
      ...t,
      content: t.content || `# ${t.title}\n\nCategory: ${t.category}\n\nStart customizing this template...\n`
    }))
    return [...defaultTemplates, ...myTemplates]
  }, [templates, myTemplates])

  // Categories for filter
  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(allTemplates.map(t => t.category)))]
  , [allTemplates])

  // Filtered templates based on search, category, and tab
  const filtered = useMemo(() => {
    const source = activeTab === 'my' ? myTemplates : allTemplates
    return source.filter(t =>
      (category === 'All' || t.category === category) &&
      (t.title.toLowerCase().includes(query.toLowerCase()) || 
       (t.description && t.description.toLowerCase().includes(query.toLowerCase())))
    )
  }, [allTemplates, myTemplates, query, category, activeTab])

  // Handle creating new custom template
  const handleCreateTemplate = () => {
    if (!newTemplate.title.trim()) return

    const templateObj = {
      id: `user-${Date.now()}`,
      ...newTemplate,
      description: newTemplate.description || `Custom template for ${newTemplate.category}`,
      content: newTemplate.content || `# ${newTemplate.title}\n\n${newTemplate.description}\n\n`,
      isCustom: true
    }

    setMyTemplates(prev => [...prev, templateObj])
    setCreateModalOpen(false)
    setNewTemplate({ title: '', category: 'Notes', description: '', content: '' })
  }

  // Handle deleting custom template
  const handleDeleteTemplate = (id) => {
    setMyTemplates(prev => prev.filter(t => t.id !== id))
  }

  // Handle using any template
  const handleUseTemplate = (t) => {
    dispatch(setCurrentNoteContent(t.content))
    navigate('/app/notes')
  }

  // Get icon based on category
  const getTemplateIcon = (category) => {
    switch(category) {
      case 'Meeting Notes': return <FileText className="w-5 h-5 text-blue-500" />
      case 'Project Plan': return <Layout className="w-5 h-5 text-purple-500" />
      case 'Task Tracker': return <CheckSquare className="w-5 h-5 text-green-500" />
      case 'Journal': return <Calendar className="w-5 h-5 text-orange-500" />
      case 'Database': return <Database className="w-5 h-5 text-red-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 className="text-lg font-semibold">Templates</h2>
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-primary btn-sm flex items-center gap-1"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            Create Template
          </button>
          <div className="border-l h-6 mx-1 dark:border-gray-700"></div>
          <button className={`btn btn-ghost btn-sm ${view==='grid'?'nav-link-active':''}`} onClick={()=>setView('grid')}>Grid</button>
          <button className={`btn btn-ghost btn-sm ${view==='list'?'nav-link-active':''}`} onClick={()=>setView('list')}>List</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b dark:border-gray-700 mb-4">
        <button className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('all')}>All Templates</button>
        <button className={`py-2 px-4 font-medium ${activeTab === 'my' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('my')}>My Templates</button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            className="form-input pl-9"
            placeholder="Search templates..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select className="form-input md:w-56" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Templates List/Grid */}
      {filtered.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500">No templates found. {activeTab === 'my' && 'Create your first template!'}</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(t => (
            <div key={t.id} className="card card-interactive relative">
              <div className="h-28 rounded-lg bg-gradient-to-br from-brand-100 to-brand-200 dark:from-gray-800 dark:to-gray-700 mb-3 flex items-center justify-center">
                {getTemplateIcon(t.category)}
              </div>
              <p className="font-medium">{t.title}</p>
              <p className="text-xs text-gray-500">{t.category}</p>
              {t.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.description}</p>}

              <div className="flex gap-2 mt-3">
                <button className="btn btn-secondary flex-1" onClick={() => handleUseTemplate(t)}>Use template</button>
                {t.isCustom && (
                  <button className="btn btn-outline btn-sm text-red-500 hover:bg-red-50 hover:border-red-200" onClick={() => handleDeleteTemplate(t.id)}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {t.isCustom && (
                <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">Custom</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map(t => (
            <li key={t.id} className="card flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">{getTemplateIcon(t.category)}</div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {t.title}
                    {t.isCustom && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">Custom</span>}
                  </p>
                  <p className="text-xs text-gray-500">{t.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {t.isCustom && (
                  <button className="btn btn-outline btn-sm text-red-500 hover:bg-red-50 hover:border-red-200" onClick={() => handleDeleteTemplate(t.id)}>
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => handleUseTemplate(t)}>Use</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Create Template Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Create New Template</h2>
              <button className="btn btn-ghost" onClick={() => setCreateModalOpen(false)}>✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name*</label>
                <input type="text" className="input w-full" placeholder="e.g., Weekly Meeting Notes" value={newTemplate.title} onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select className="input w-full" value={newTemplate.category} onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}>
                  <option>Notes</option>
                  <option>Meeting Notes</option>
                  <option>Project Plan</option>
                  <option>Task Tracker</option>
                  <option>Journal</option>
                  <option>Database</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input type="text" className="input w-full" placeholder="Brief description" value={newTemplate.description} onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Template Content</label>
                <textarea className="input w-full h-32" placeholder="# Title&#10;&#10;## Section 1" value={newTemplate.content} onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})} />
                <p className="text-xs text-gray-500 mt-1">Use Markdown formatting.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button className="btn btn-outline" onClick={() => setCreateModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary flex items-center gap-2" onClick={handleCreateTemplate} disabled={!newTemplate.title.trim()}>
                <Save className="w-4 h-4" /> Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
