import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useRef, useState } from 'react'
import { 
  Home, 
  NotebookPen, 
  CheckSquare, 
  Folder, 
  PanelsTopLeft, 
  User, 
  Sun, 
  Moon, 
  LogOut, 
  LayoutDashboard, 
  Brain, 
  Target, 
  Users, 
  Settings, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react'

const studentSideNav = [
  { to: '/app/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/app/notes', label: 'Notes', Icon: NotebookPen },
  { to: '/app/tasks', label: 'Tasks', Icon: CheckSquare },
  { to: '/app/files', label: 'Files', Icon: Folder },
  { to: '/app/ai-workspace', label: 'AI Workspace', Icon: Brain },
  { to: '/app/goals', label: 'Goals', Icon: Target },
  { to: '/app/collaboration', label: 'Collaboration', Icon: Users },
  { to: '/app/templates', label: 'Templates', Icon: PanelsTopLeft },
]

const studentTopNav = [
  { to: '/app/profile', label: 'Profile', Icon: User },
  { to: '/app/settings', label: 'Settings', Icon: Settings },
  { to: '/app/faq', label: 'FAQ', Icon: HelpCircle },
]

export default function StudentLayout() {
  const { logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const themeBtnRef = useRef(null)
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ease-in-out bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex-shrink-0
          ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} lg:w-64`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand text-white text-sm font-bold flex items-center justify-center">NS</div>
            {sidebarOpen && <span className="font-semibold">Notospace</span>}
          </Link>
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {sidebarOpen && (
          <>
            <nav className="p-3 space-y-1">
              {studentSideNav.map(({to,label,Icon})=> (
                <NavLink key={to} to={to} className={({isActive})=>`nav-link ${isActive?'nav-link-active':''}`}>
                  <Icon className="w-4 h-4"/>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto p-3 border-t border-gray-200 dark:border-gray-800">
              <button className="btn btn-outline w-full flex items-center justify-center gap-2" onClick={logout}>
                <LogOut className="w-4 h-4"/> Logout
              </button>
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            {/* Sidebar toggle */}
            <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={()=>navigate('/app/dashboard')}
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </button>
          </div>

          {/* Topnav links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {studentTopNav.map(({to,label,Icon}) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({isActive}) => `flex items-center justify-center sm:justify-start px-3 py-2 rounded-lg text-sm gap-2 transition-colors ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button ref={themeBtnRef} className="btn btn-ghost p-2" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            </button>
            <button className="btn btn-outline hidden sm:flex items-center gap-2" onClick={logout}>
              <LogOut className="w-4 h-4"/> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 overflow-auto min-w-0">
          <div className="container-pro">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
