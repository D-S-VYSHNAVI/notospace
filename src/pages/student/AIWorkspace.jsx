import { useState } from 'react'
import { Brain, Send, Sparkles, Clock, Plus, BookOpen } from 'lucide-react'

export default function AIWorkspace() {
  const [prompt, setPrompt] = useState('')
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Research Assistant', lastUsed: '2 hours ago' },
    { id: 2, title: 'Study Notes Generator', lastUsed: 'Yesterday' },
    { id: 3, title: 'Code Explainer', lastUsed: '3 days ago' },
  ])
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', content: 'Welcome to AI Workspace. How can I help you today?' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now(), role: 'user', content: prompt }
    ]
    setMessages(newMessages)
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          id: Date.now() + 1, 
          role: 'assistant', 
          content: 'This is a simulated AI response. In a production environment, this would connect to an AI service like OpenAI or a custom backend API.' 
        }
      ])
    }, 1000)
    
    setPrompt('')
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          AI Workspace
        </h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="card p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Recent Chats</h2>
          </div>
          <div className="space-y-2">
            {conversations.map(chat => (
              <button 
                key={chat.id}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-purple-500" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {chat.lastUsed}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <h2 className="font-medium mb-2">AI Tools</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Summarize Text</span>
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Generate Study Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="card flex flex-col flex-1 min-h-0">
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                className="input flex-1"
              />
              <button 
                type="submit" 
                className="btn btn-primary p-2"
                disabled={!prompt.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}