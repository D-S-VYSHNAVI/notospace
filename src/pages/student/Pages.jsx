import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, File, Save } from 'lucide-react'
import PageTree from '../../components/pages/PageTree'

// Rich text editor (using a placeholder - in a real app, you'd use TipTap, React Quill, etc.)
const RichTextEditor = ({ content, onChange }) => {
  return (
    <div className="min-h-[300px] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <textarea
        className="w-full h-full min-h-[300px] bg-transparent outline-none resize-none"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing..."
      />
    </div>
  )
}

export default function Pages() {
  const { pageId } = useParams()
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [pageContent, setPageContent] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock data - in a real app, this would come from API/MongoDB
  useEffect(() => {
    // Sample nested page structure
    const samplePages = [
      {
        id: '1',
        title: 'Getting Started',
        content: 'Welcome to your workspace. Create nested pages to organize your content.',
        children: [
          {
            id: '1-1',
            title: 'How to use pages',
            content: 'Pages can contain sub-pages, creating a hierarchical structure.',
            children: []
          }
        ]
      },
      {
        id: '2',
        title: 'Project Notes',
        content: 'Keep all your project notes organized here.',
        children: [
          {
            id: '2-1',
            title: 'Research',
            content: 'Research findings and resources.',
            children: []
          },
          {
            id: '2-2',
            title: 'Ideas',
            content: 'Brainstorming and new ideas.',
            children: [
              {
                id: '2-2-1',
                title: 'Feature concepts',
                content: 'Potential new features to implement.',
                children: []
              }
            ]
          }
        ]
      }
    ]
    
    setPages(samplePages)
    
    // If pageId is provided, find and set the current page
    if (pageId) {
      const findPage = (pages, id) => {
        for (const page of pages) {
          if (page.id === id) return page
          if (page.children && page.children.length > 0) {
            const found = findPage(page.children, id)
            if (found) return found
          }
        }
        return null
      }
      
      const page = findPage(samplePages, pageId)
      if (page) {
        setCurrentPage(page)
        setPageTitle(page.title)
        setPageContent(page.content)
      }
    }
  }, [pageId])

  const handleCreatePage = ({ parentId = null }) => {
    const newPageId = Date.now().toString()
    const newPage = {
      id: newPageId,
      title: 'Untitled Page',
      content: '',
      children: []
    }
    
    if (!parentId) {
      // Add as root page
      setPages([...pages, newPage])
    } else {
      // Add as child page
      const updatePages = (pages) => {
        return pages.map(page => {
          if (page.id === parentId) {
            return {
              ...page,
              children: [...(page.children || []), newPage]
            }
          }
          if (page.children && page.children.length > 0) {
            return {
              ...page,
              children: updatePages(page.children)
            }
          }
          return page
        })
      }
      
      setPages(updatePages(pages))
    }
    
    // Set the new page as current
    setCurrentPage(newPage)
    setPageTitle(newPage.title)
    setPageContent(newPage.content)
    setIsEditing(true)
  }
  
  const handleDeletePage = (pageId) => {
    const deleteFromPages = (pages) => {
      return pages.filter(page => {
        if (page.id === pageId) return false
        if (page.children && page.children.length > 0) {
          page.children = deleteFromPages(page.children)
        }
        return true
      })
    }
    
    setPages(deleteFromPages(pages))
    
    // If the deleted page was the current page, clear the current page
    if (currentPage && currentPage.id === pageId) {
      setCurrentPage(null)
      setPageTitle('')
      setPageContent('')
    }
  }
  
  const handleRenamePage = (pageId, newTitle) => {
    const updatePages = (pages) => {
      return pages.map(page => {
        if (page.id === pageId) {
          return { ...page, title: newTitle }
        }
        if (page.children && page.children.length > 0) {
          return {
            ...page,
            children: updatePages(page.children)
          }
        }
        return page
      })
    }
    
    setPages(updatePages(pages))
    
    // Update current page title if it's the renamed page
    if (currentPage && currentPage.id === pageId) {
      setPageTitle(newTitle)
      setCurrentPage({ ...currentPage, title: newTitle })
    }
  }
  
  const handleSavePage = () => {
    if (!currentPage) return
    
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      const updatePages = (pages) => {
        return pages.map(page => {
          if (page.id === currentPage.id) {
            return {
              ...page,
              title: pageTitle,
              content: pageContent
            }
          }
          if (page.children && page.children.length > 0) {
            return {
              ...page,
              children: updatePages(page.children)
            }
          }
          return page
        })
      }
      
      setPages(updatePages(pages))
      setCurrentPage({
        ...currentPage,
        title: pageTitle,
        content: pageContent
      })
      setIsEditing(false)
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="h-[calc(100vh-12rem)] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar with page tree */}
      <div className="card p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Pages</h2>
          <button 
            onClick={() => handleCreatePage({})}
            className="btn btn-ghost btn-sm p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <PageTree 
          rootPages={pages}
          onCreatePage={handleCreatePage}
          onDeletePage={handleDeletePage}
          onRenamePage={handleRenamePage}
        />
      </div>
      
      {/* Page content area */}
      <div className="card flex flex-col overflow-auto">
        {currentPage ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              {isEditing ? (
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="input flex-1 text-xl font-bold"
                  placeholder="Page Title"
                />
              ) : (
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <File className="w-5 h-5 text-gray-500" />
                  {pageTitle}
                </h1>
              )}
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button 
                    onClick={handleSavePage}
                    className="btn btn-primary flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-4 flex-1 overflow-auto">
              {isEditing ? (
                <RichTextEditor 
                  content={pageContent}
                  onChange={setPageContent}
                />
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {pageContent || (
                    <div className="text-gray-500 italic">No content yet. Click Edit to add content.</div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <File className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h2 className="text-xl font-bold mb-2">No page selected</h2>
            <p className="text-gray-500 mb-4">Select a page from the sidebar or create a new one</p>
            <button 
              onClick={() => handleCreatePage({})}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Page
            </button>
          </div>
        )}
      </div>
    </div>
  )
}