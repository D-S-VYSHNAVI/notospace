import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/landing/Landing'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import StudentLayout from './components/layouts/StudentLayout'
import AdminLayout from './components/layouts/AdminLayout'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './pages/student/Dashboard'
import Notes from './pages/student/Notes'
import Tasks from './pages/student/Tasks'
import Files from './pages/student/Files'
import Pages from './pages/student/Pages'
import AIWorkspace from './pages/student/AIWorkspace'
import Goals from './pages/student/Goals'
import Collaboration from './pages/student/Collaboration'
import Templates from './pages/student/Templates'
import Profile from './pages/student/Profile'
import Settings from './pages/student/Settings'
import FAQ from './pages/student/FAQ'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageStudents from './pages/admin/ManageStudents'
import ManageTemplates from './pages/admin/ManageTemplates'
import AdminSettings from './pages/admin/AdminSettings'
import AdminReports from './pages/admin/AdminReports'
import ReduxProvider from './components/routes/Provider'
import PublicAbout from './pages/PublicAbout'
import PublicContact from './pages/PublicContact'
import PublicDocs from './pages/PublicDocs'
import PublicPricing from './pages/PublicPricing'
import PublicSupport from './pages/PublicSupport'
import PublicPrivacy from './pages/PublicPrivacy'
import PublicApi from './pages/PublicApi'
import PublicCareers from './pages/PublicCareers'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role)
    return <Navigate to={user.role === 'admin' ? '/admin' : '/app'} replace />
  return children
}

export default function App() {
  return (
    <ReduxProvider>
      <AuthProvider>
        <ToastProvider>
          <ThemeProvider>
          <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<PublicAbout />} />
            <Route path="/contact" element={<PublicContact />} />
            <Route path="/docs" element={<PublicDocs />} />
            <Route path="/pricing" element={<PublicPricing />} />
            <Route path="/careers" element={<PublicCareers />} />
            <Route path="/support" element={<PublicSupport />} />
            <Route path="/privacy" element={<PublicPrivacy />} />
            <Route path="/api" element={<PublicApi />} />

            {/* Student protected routes */}
            <Route
              path="/app/*"
              element={
                <ProtectedRoute role="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notes" element={<Notes />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="files" element={<Files />} />
              <Route path="pages" element={<Pages />} />
              <Route path="pages/:pageId" element={<Pages />} />
              <Route path="ai-workspace" element={<AIWorkspace />} />
              <Route path="goals" element={<Goals />} />
              <Route path="collaboration" element={<Collaboration />} />
              <Route path="templates" element={<Templates />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="faq" element={<FAQ />} />
            </Route>

            {/* Admin protected routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="templates" element={<ManageTemplates />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
          </ThemeProvider>
        </ToastProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
