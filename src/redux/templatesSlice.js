import { createSlice } from '@reduxjs/toolkit'

const categories = [
  'Study', 'Project', 'Career', 'Personal', 'CRM', 'Journal', 'Planner', 'Budget',
  'Reading', 'Content', 'Meeting', 'Research', 'Fitness', 'Habits', 'Roadmap', 'OKR',
]

const templateTitles = [
  'Study Planner', 'Project Tracker', 'Personal CRM', 'Daily Journal', 'Weekly Planner',
  'Budget Tracker', 'Reading List', 'Content Calendar', 'Meeting Notes', 'Research Notes',
  'Fitness Log', 'Habit Tracker', 'Product Roadmap', 'OKR Tracker', 'Task Board', 'Sprint Board',
  'Bug Tracker', 'Feature Requests', 'Class Notes', 'Exam Revision', 'Interview Prep', 'Portfolio Plan',
  'Client Tracker', 'Sales Pipeline', 'Marketing Plan', 'SEO Checklist', 'Design System', 'Brand Guidelines',
  'User Research', 'Usability Testing', 'Release Notes', 'Changelog', 'Incident Report', 'Onboarding Checklist',
  'Travel Planner', 'Meal Planner', 'Recipe Book', 'Workout Plan', 'Mind Map', 'Idea Board', 'Journal Prompts',
  'Daily Standup', 'Retrospective', 'One-on-One Notes', 'Learning Roadmap', 'Thesis Plan', 'Grant Proposal',
  'Book Notes', 'Podcast Notes', 'YouTube Script', 'Newsletter Plan', 'CRM Lite', 'Lead Tracker',
  'Job Applications', 'Career Goals', 'Skill Matrix', 'Course Planner', 'Lecture Notes', 'Lab Report',
  'Kanban Board', 'Calendar View', 'Timeline Plan', 'Event Plan', 'Conference Notes', 'Syllabus',
  'Project Brief', 'Requirements Doc', 'Architecture Notes', 'API Catalog', 'Runbook', 'Playbook',
  'SOP', 'Inventory', 'Asset Tracker', 'Expense Log', 'Invoice List', 'OKR Review', 'Quarter Plan',
  'Yearly Goals', 'Vision Board', 'Mood Board', 'Brainstorm', 'Whiteboard', 'Growth Plan', 'PRD',
  'Spec Doc', 'Test Plan', 'Test Cases', 'Bug Bash', 'Support Queue', 'FAQ', 'Knowledge Base', 'How-To',
  'Release Checklist', 'Deployment Plan', 'Rollback Plan', 'Security Review', 'Risk Register', 'Competitor Analysis',
  'SWOT', 'User Stories', 'Acceptance Criteria', 'Wireframe Notes'
]

const initialTemplates = Array.from({ length: 100 }).map((_, i) => ({
  id: `tpl-${i + 1}`,
  title: templateTitles[i % templateTitles.length] + (i >= templateTitles.length ? ` ${Math.floor(i / templateTitles.length) + 1}` : ''),
  category: categories[i % categories.length],
  description: 'Interactive template ready to duplicate into your workspace.',
}))

const templatesSlice = createSlice({
  name: 'templates',
  initialState: {
    items: initialTemplates,
  },
  reducers: {
    addTemplate(state, action) {
      state.items.push({ id: crypto.randomUUID(), ...action.payload })
    },
    removeTemplate(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTemplate, removeTemplate } = templatesSlice.actions
export default templatesSlice.reducer


