import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊', color: 'from-blue-500 to-blue-600' },
  { to: '/admin/students', label: 'User Management', icon: '👥', color: 'from-green-500 to-green-600' },
  { to: '/admin/templates', label: 'Content Management', icon: '🗂️', color: 'from-purple-500 to-purple-600' },
  { to: '/admin/reports', label: 'Reports & Logs', icon: '📜', color: 'from-amber-500 to-amber-600' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️', color: 'from-slate-500 to-slate-600' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="container-pro h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              NS
            </div>
            <span className="font-display font-semibold text-lg text-gradient">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{user?.name}</span>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="container-pro grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 py-6">
        {/* Sidebar */}
        <aside className="card h-fit sticky top-24 self-start">
          <nav className="space-y-2">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {item.icon}
                </div>
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          <div className="max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
