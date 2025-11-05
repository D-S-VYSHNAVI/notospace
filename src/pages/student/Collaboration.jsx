import { useState } from 'react'
import { Users, Share, Clock, MessageSquare, UserPlus, Lock, Globe, User } from 'lucide-react'

// Shared document component
const SharedDocument = ({ doc, onView }) => {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onView(doc)}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <doc.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-medium truncate">{doc.title}</h3>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${
          doc.access === 'edit' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {doc.access === 'edit' ? 'Can Edit' : 'View Only'}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{doc.owner}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{doc.lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}

// Team member component
const TeamMember = ({ member }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
        ) : (
          <span className="text-lg font-medium">{member.name.charAt(0)}</span>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{member.name}</h3>
        <p className="text-xs text-gray-500">{member.role}</p>
      </div>
      
      <div className={`text-xs px-2 py-1 rounded-full ${
        member.status === 'online' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      }`}>
        {member.status}
      </div>
    </div>
  )
}

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState('shared')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  
  // Mock data for shared documents
  const sharedDocs = [
    {
      id: '1',
      title: 'Project Research Notes',
      description: 'Collaborative research notes for our team project on renewable energy sources.',
      owner: 'Alex Johnson',
      access: 'edit',
      lastUpdated: '2 hours ago',
      icon: MessageSquare
    },
    {
      id: '2',
      title: 'Meeting Minutes - May 15',
      description: 'Notes from our weekly team meeting discussing project progress and next steps.',
      owner: 'Sarah Williams',
      access: 'view',
      lastUpdated: 'Yesterday',
      icon: MessageSquare
    },
    {
      id: '3',
      title: 'Product Roadmap Q3',
      description: 'Strategic planning document outlining our product development goals for Q3.',
      owner: 'Michael Chen',
      access: 'edit',
      lastUpdated: '3 days ago',
      icon: MessageSquare
    },
    {
      id: '4',
      title: 'Design System Documentation',
      description: 'Comprehensive guide to our design system components and usage guidelines.',
      owner: 'Emma Rodriguez',
      access: 'view',
      lastUpdated: 'Last week',
      icon: MessageSquare
    }
  ]
  
  // Mock data for team members
  const teamMembers = [
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Project Manager',
      status: 'online',
      avatar: ''
    },
    {
      id: '2',
      name: 'Sarah Williams',
      role: 'UX Designer',
      status: 'offline',
      avatar: ''
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Developer',
      status: 'online',
      avatar: ''
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      role: 'Content Writer',
      status: 'offline',
      avatar: ''
    }
  ]
  
  const handleViewDoc = (doc) => {
    setSelectedDoc(doc)
  }
  
  const closeDocModal = () => {
    setSelectedDoc(null)
  }
  
  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Collaboration Space</h1>
        <p className="text-gray-500">Work together with your team on shared documents and projects</p>
      </div>
      
      <div className="flex border-b dark:border-gray-700 mb-6">
        <button 
          className={`py-2 px-4 font-medium ${
            activeTab === 'shared' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('shared')}
        >
          Shared with me
        </button>
        <button 
          className={`py-2 px-4 font-medium ${
            activeTab === 'team' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('team')}
        >
          Team Members
        </button>
      </div>
      
      {activeTab === 'shared' ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Shared Documents</h2>
            <button 
              className="btn btn-primary flex items-center gap-2"
              onClick={() => setShareModalOpen(true)}
            >
              <Share className="w-4 h-4" />
              Share a Document
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sharedDocs.map(doc => (
              <SharedDocument 
                key={doc.id} 
                doc={doc} 
                onView={handleViewDoc}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Team Members</h2>
            <button 
              className="btn btn-primary flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
          
          <div className="card">
            {teamMembers.map(member => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </>
      )}
      
      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <selectedDoc.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedDoc.title}</h2>
                  <p className="text-sm text-gray-500">
                    Shared by {selectedDoc.owner} • Last updated {selectedDoc.lastUpdated}
                  </p>
                </div>
              </div>
              <button 
                className="btn btn-ghost"
                onClick={closeDocModal}
              >
                ✕
              </button>
            </div>
            
            <div className="border-t border-b dark:border-gray-700 py-4 my-4 flex-1 overflow-auto">
              <p className="mb-4">{selectedDoc.description}</p>
              <p className="text-gray-600 dark:text-gray-300">
                This is a mock document content. In a real implementation, this would display the actual content of the shared document with collaborative editing features if the user has edit access.
              </p>
            </div>
            
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  selectedDoc.access === 'edit' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {selectedDoc.access === 'edit' ? (
                    <>
                      <span>Can Edit</span>
                    </>
                  ) : (
                    <>
                      <span>View Only</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="btn btn-outline flex items-center gap-2"
                  onClick={closeDocModal}
                >
                  Close
                </button>
                {selectedDoc.access === 'edit' && (
                  <button 
                    className="btn btn-primary flex items-center gap-2"
                  >
                    Edit Document
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Share a Document</h2>
              <button 
                className="btn btn-ghost"
                onClick={() => setShareModalOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Document</label>
              <select className="input w-full">
                <option value="">Select a document to share</option>
                <option value="1">Project Notes</option>
                <option value="2">Research Paper</option>
                <option value="3">Meeting Minutes</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Share with</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="Enter email addresses"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Permission</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="permission" value="view" defaultChecked />
                  <span>View only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="permission" value="edit" />
                  <span>Can edit</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Access</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="access" value="specific" defaultChecked />
                  <span className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    Specific people
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="access" value="anyone" />
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Anyone with link
                  </span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-outline"
                onClick={() => setShareModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary flex items-center gap-2"
                onClick={() => {
                  setShareModalOpen(false)
                }}
              >
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}