import { Route, Navigate } from 'react-router-dom'
import Dashboard from '../../pages/student/Dashboard'
import Calendar from '../../pages/student/Calendar'
import Notes from '../../pages/student/Notes'
import Tasks from '../../pages/student/Tasks'
import Files from '../../pages/student/Files'
import Reading from '../../pages/student/Reading'
import Courses from '../../pages/student/Courses'
import Planner from '../../pages/student/Planner'
import Goals from '../../pages/student/Goals'
import Interview from '../../pages/student/Interview'
import DatabaseDemo from '../../pages/student/DatabaseDemo'
import Templates from '../../pages/student/Templates'
import Profile from '../../pages/student/Profile'
import Settings from '../../pages/student/Settings'
import Help from '../../pages/student/Help'

export default function StudentRoutes() {
  return (
    <>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="notes" element={<Notes />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="files" element={<Files />} />
      <Route path="reading" element={<Reading />} />
      <Route path="courses" element={<Courses />} />
      <Route path="planner" element={<Planner />} />
      <Route path="goals" element={<Goals />} />
      <Route path="interview" element={<Interview />} />
      <Route path="database" element={<DatabaseDemo />} />
      <Route path="templates" element={<Templates />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="help" element={<Help />} />
    </>
  )
}
