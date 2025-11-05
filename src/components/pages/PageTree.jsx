import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, Plus, MoreHorizontal, File, Trash2, Edit } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

// This component handles the nested page tree structure
export default function PageTree({ rootPages = [], onCreatePage, onDeletePage, onRenamePage }) {
  return (
    <div className="space-y-1">
      {rootPages.map(page => (
        <PageNode 
          key={page.id} 
          page={page} 
          level={0}
          onCreatePage={onCreatePage}
          onDeletePage={onDeletePage}
          onRenamePage={onRenamePage}
        />
      ))}
      <button 
        onClick={() => onCreatePage({ parentId: null })}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
      >
        <Plus className="w-4 h-4" />
        <span>Add a page</span>
      </button>
    </div>
  )
}

// Individual page node component that can be expanded to show children
function PageNode({ page, level, onCreatePage, onDeletePage, onRenamePage }) {
  const [expanded, setExpanded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTitle, setNewTitle] = useState(page.title)
  const navigate = useNavigate()
  
  const hasChildren = page.children && page.children.length > 0
  
  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(!expanded)
  }
  
  const handleRename = (e) => {
    e.preventDefault()
    if (newTitle.trim() && newTitle !== page.title) {
      onRenamePage(page.id, newTitle)
    }
    setIsRenaming(false)
  }
  
  const handlePageClick = () => {
    navigate(`/app/pages/${page.id}`)
  }
  
  return (
    <div className="space-y-1">
      <div 
        className="flex items-center group relative"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {hasChildren ? (
          <button 
            onClick={handleToggle}
            className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <span className="w-6"></span>
        )}
        
        {isRenaming ? (
          <form onSubmit={handleRename} className="flex-1">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
              onBlur={handleRename}
              className="input input-sm w-full"
            />
          </form>
        ) : (
          <div 
            onClick={handlePageClick}
            className="flex-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2"
          >
            <File className="w-4 h-4 text-gray-500" />
            <span className="truncate">{page.title}</span>
          </div>
        )}
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          <button 
            onClick={() => onCreatePage({ parentId: page.id })}
            className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={() => {
                      setIsRenaming(true)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      onDeletePage(page.id)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="space-y-1">
          {page.children.map(childPage => (
            <PageNode 
              key={childPage.id} 
              page={childPage} 
              level={level + 1}
              onCreatePage={onCreatePage}
              onDeletePage={onDeletePage}
              onRenamePage={onRenamePage}
            />
          ))}
        </div>
      )}
    </div>
  )
}