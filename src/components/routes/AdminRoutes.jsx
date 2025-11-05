import { Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../../pages/admin/AdminDashboard'
import ManageStudents from '../../pages/admin/ManageStudents'
import ManageTemplates from '../../pages/admin/ManageTemplates'
import AdminSettings from '../../pages/admin/AdminSettings'
import AdminReports from '../../pages/admin/AdminReports'

export default function AdminRoutes() {
  return (
    <>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="students" element={<ManageStudents />} />
      <Route path="templates" element={<ManageTemplates />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="settings" element={<AdminSettings />} />
    </>
  )
}
