import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FileText, FolderUp, Sparkles, X, Download, FileIcon } from 'lucide-react'

export default function Files() {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [summary, setSummary] = useState('')
  const [summarizing, setSummarizing] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const handleMockUpload = (e) => {
    const list = Array.from(e.target.files || [])
    const newFiles = list.map(f => ({ 
      id: crypto.randomUUID(), 
      name: f.name, 
      size: f.size,
      type: f.type,
      date: new Date().toISOString(),
      summary: '',
      hasSummary: false
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    inputRef.current.value = ''
    if (list.length) toast.success(`${list.length} file(s) added`)
  }
  
  const handleSummarize = (file) => {
    setSelectedFile(file)
    setSummarizing(true)
    setSummary('Generating summary...')
    
    // Simulate API call to summarize file
    setTimeout(() => {
      const mockSummaries = {
        'pdf': 'This PDF document contains a detailed analysis of quarterly financial results. Key points include revenue growth of 15%, increased market share in North America, and strategic expansion plans for Q3. The document also outlines potential risks and mitigation strategies.',
        'doc': 'This document outlines the project proposal for the new customer management system. It includes requirements analysis, technical specifications, timeline, and budget considerations. The proposed solution leverages cloud infrastructure for scalability.',
        'txt': 'This text file contains meeting notes from the product development team. Discussion topics included feature prioritization, bug fixes for the upcoming release, and resource allocation for the next sprint. Action items were assigned to team members with deadlines.',
        'default': 'This document contains important information related to the project. Key sections include methodology, findings, and recommendations. The content is well-structured and provides valuable insights for stakeholders.'
      }
      
      // Determine file extension
      const extension = file.name.split('.').pop().toLowerCase()
      const summaryText = mockSummaries[extension] || mockSummaries.default
      
      // Update file with summary
      setFiles(prev => prev.map(f => 
        f.id === file.id 
          ? { ...f, summary: summaryText, hasSummary: true } 
          : f
      ))
      
      setSummary(summaryText)
      setSummarizing(false)
    }, 1500)
  }
  
  const closeModal = () => {
    setSelectedFile(null)
    setSummary('')
  }
  
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    
    switch(extension) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <FileText className="w-8 h-8 text-green-500" />
      case 'ppt':
      case 'pptx':
        return <FileText className="w-8 h-8 text-orange-500" />
      case 'txt':
        return <FileText className="w-8 h-8 text-gray-500" />
      default:
        return <FileIcon className="w-8 h-8 text-gray-500" />
    }
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Files</h1>
          <p className="text-gray-500">Upload and manage your files with AI-powered summaries</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={handleMockUpload} />
          <button 
            className="btn btn-primary flex items-center gap-2" 
            onClick={() => inputRef.current?.click()}
          >
            <FolderUp className="w-4 h-4" />
            Upload Files
          </button>
        </div>
      </div>
      
      {files.length === 0 ? (
        <div className="card p-8 flex flex-col items-center justify-center text-center">
          <FolderUp className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-xl font-bold mb-2">No files uploaded yet</h2>
          <p className="text-gray-500 mb-4">Upload files to see them here and generate summaries</p>
          <button 
            className="btn btn-primary flex items-center gap-2" 
            onClick={() => inputRef.current?.click()}
          >
            <FolderUp className="w-4 h-4" />
            Upload Files
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map(file => (
            <div key={file.id} className="card p-4 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                {getFileIcon(file.name)}
                <button 
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => setFiles(s => s.filter(x => x.id !== file.id))}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="font-medium mb-1 truncate" title={file.name}>{file.name}</h3>
              <p className="text-xs text-gray-500 mb-2">
                {(file.size/1024).toFixed(1)} KB • {new Date(file.date).toLocaleDateString()}
              </p>
              
              {file.hasSummary ? (
                <div className="mt-auto">
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{file.summary}</p>
                  <button 
                    className="btn btn-sm btn-outline w-full"
                    onClick={() => {
                      setSelectedFile(file)
                      setSummary(file.summary)
                    }}
                  >
                    View Summary
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-sm btn-primary mt-auto flex items-center gap-2"
                  onClick={() => handleSummarize(file)}
                >
                  <Sparkles className="w-3 h-3" />
                  Summarize
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Size</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id} className="border-b dark:border-gray-700">
                  <td className="p-4 flex items-center gap-2">
                    {getFileIcon(file.name)}
                    <span className="truncate max-w-[200px]">{file.name}</span>
                  </td>
                  <td className="p-4">{(file.size/1024).toFixed(1)} KB</td>
                  <td className="p-4">{new Date(file.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {file.hasSummary ? (
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => {
                            setSelectedFile(file)
                            setSummary(file.summary)
                          }}
                        >
                          View Summary
                        </button>
                      ) : (
                        <button 
                          className="btn btn-sm btn-primary flex items-center gap-2"
                          onClick={() => handleSummarize(file)}
                        >
                          <Sparkles className="w-3 h-3" />
                          Summarize
                        </button>
                      )}
                      <button 
                        className="btn btn-sm btn-ghost text-red-500"
                        onClick={() => setFiles(s => s.filter(x => x.id !== file.id))}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Summary Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {getFileIcon(selectedFile.name)}
                <div>
                  <h3 className="font-bold">{selectedFile.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size/1024).toFixed(1)} KB • {new Date(selectedFile.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="border-t border-b dark:border-gray-700 py-4 my-4 flex-1 overflow-auto">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-Generated Summary
              </h4>
              
              {summarizing ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-pulse text-primary">Generating summary...</div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">{summary}</p>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-outline"
                onClick={closeModal}
              >
                Close
              </button>
              <button 
                className="btn btn-primary flex items-center gap-2"
                onClick={() => {
                  toast.success('Summary downloaded')
                  closeModal()
                }}
              >
                <Download className="w-4 h-4" />
                Download Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


