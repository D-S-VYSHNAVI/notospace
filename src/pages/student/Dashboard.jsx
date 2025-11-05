import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  NotebookPen,
  CheckSquare,
  Folder,
  Clock,
  Plus,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const [notesPreview, setNotesPreview] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [recentPages, setRecentPages] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [quickNote, setQuickNote] = useState('');

  // Additional mock data
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [shared, setShared] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [productivity, setProductivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls later
    setRecentPages([
      { id: 1, title: 'Project Ideas', type: 'note', lastEdited: '2 hours ago' },
      { id: 2, title: 'Meeting Notes', type: 'note', lastEdited: 'Yesterday' },
      { id: 3, title: 'Research Summary', type: 'note', lastEdited: '3 days ago' },
    ]);

    setNotesPreview([
      { id: 1, title: 'Welcome to Notospace', snippet: 'This is your productivity workspace.' },
      { id: 2, title: 'React Tips', snippet: 'Hooks, patterns, and more.' },
    ]);

    setTasks([
      { id: 1, text: 'Complete project proposal', done: false, status: 'todo', due: 'Today' },
      { id: 2, text: 'Review documentation', done: true, status: 'done', due: 'Yesterday' },
      { id: 3, text: 'Prepare presentation', done: false, status: 'doing', due: 'Tomorrow' },
      { id: 4, text: 'Research new technologies', done: false, status: 'todo', due: 'Next week' },
    ]);

    setRecentFiles([
      { id: 1, name: 'Research Paper.pdf', size: '2.4 MB', uploaded: 'Yesterday' },
      { id: 2, name: 'Project Proposal.docx', size: '1.8 MB', uploaded: '3 days ago' },
    ]);

    setFeaturedTemplates([
      { id: 1, name: 'Meeting Notes', category: 'Productivity' },
      { id: 2, name: 'Project Tracker', category: 'Project Management' },
      { id: 3, name: 'Weekly Planner', category: 'Organization' },
      { id: 4, name: 'Reading List', category: 'Personal' },
    ]);

    setAssignments([
      { id: 1, title: 'ML Assignment 1', due: 'Today' },
      { id: 2, title: 'Compiler Design Quiz', due: 'Tomorrow' },
      { id: 3, title: 'Web Tech Project', due: 'Next Week' },
    ]);

    setAnnouncements([
      { id: 1, text: 'Hackathon registration open', time: '2h ago', level: 'info' },
      { id: 2, text: 'Server maintenance tonight', time: '1 day ago', level: 'warn' },
    ]);

    setShared([
      { id: 1, name: 'AI Report.pdf', owner: 'John' },
      { id: 2, name: 'Group Notes.docx', owner: 'Sarah' },
    ]);

    setFavorites([
      { id: 1, name: 'Data Mining Summary' },
      { id: 2, name: 'Weekly Planner' },
    ]);

    setProductivity([2, 4, 7, 5, 8, 6, 9]); // fake graph data
  }, []);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;
    const done = tasks.filter((t) => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const Card = ({ title, icon, action, children, className = '' }) => (
    <motion.div
      className={`p-4 rounded-2xl shadow-sm bg-white dark:bg-gray-900 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <p className="text-sm font-medium">{title}</p>
        </div>
        {action}
      </div>
      <div className="mt-3">{children}</div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Tasks"
          icon={<CheckSquare className="w-4 h-4 text-green-500" />}
          action={<Link to="/app/tasks" className="text-xs text-blue-500 hover:underline">View all</Link>}
        >
          <p className="text-3xl font-bold">
            {tasks.filter((t) => t.done).length}/{tasks.length}
          </p>
          <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
        </Card>

        <Card
          title="Notes"
          icon={<NotebookPen className="w-4 h-4 text-blue-500" />}
          action={<Link to="/app/notes" className="text-xs text-blue-500 hover:underline">View all</Link>}
        >
          <p className="text-3xl font-bold">{notesPreview.length}</p>
          <div className="mt-2 space-y-1">
            {notesPreview.map((note) => (
              <div key={note.id} className="text-sm truncate">{note.title}</div>
            ))}
          </div>
        </Card>

        <Card
          title="Files"
          icon={<Folder className="w-4 h-4 text-purple-500" />}
          action={<Link to="/app/files" className="text-xs text-blue-500 hover:underline">View all</Link>}
        >
          <p className="text-3xl font-bold">{recentFiles.length}</p>
          <div className="mt-2 space-y-1">
            {recentFiles.map((file) => (
              <div key={file.id} className="text-sm truncate">{file.name}</div>
            ))}
          </div>
        </Card>

        <Card
          title="Templates"
          icon={<Sparkles className="w-4 h-4 text-amber-500" />}
          action={<Link to="/app/templates" className="text-xs text-blue-500 hover:underline">Browse</Link>}
        >
          <p className="text-3xl font-bold">{featuredTemplates.length}</p>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Recent Pages"
            icon={<Clock className="w-4 h-4 text-gray-500" />}
            action={<button className="btn btn-ghost btn-sm p-1"><Plus className="w-4 h-4" /></button>}
          >
            <ul className="space-y-2 text-sm">
              {recentPages.map((p) => (
                <li key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>{p.title}</span>
                  <span className="text-xs text-gray-500">{p.lastEdited}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Assignments" action={<button className="btn btn-outline btn-sm">Add</button>}>
            <ul className="space-y-2 text-sm">
              {assignments.map((a) => (
                <li key={a.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>{a.title}</span>
                  <span className="text-xs text-gray-500">{a.due}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Notes" action={<Link to="/app/notes" className="btn btn-outline btn-sm">New Note</Link>}>
            <ul className="space-y-2 text-sm">
              {notesPreview.map((n) => (
                <li key={n.id} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.snippet}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Tasks" action={<Link to="/app/tasks" className="btn btn-outline btn-sm">Open Tasks</Link>}>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {['todo', 'doing', 'done'].map((col) => (
                <div key={col} className="rounded-lg border border-gray-200 dark:border-gray-800 p-2">
                  <p className="text-xs text-gray-500 capitalize">{col}</p>
                  <ul className="mt-1 space-y-1">
                    {tasks.filter((t) => t.status === col).slice(0, 3).map((t) => (
                      <li key={t.id} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{t.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Section */}
        <div className="grid gap-4">
          <Card title="Calendar" action={<Link to="/app/calendar" className="btn btn-outline btn-sm">Today</Link>}>
            <div className="flex items-end gap-2 h-24">
              {productivity.map((v, i) => (
                <div key={i} className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-t">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(v / 10) * 100}%` }} />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Quick Notes" action={<button className="btn btn-primary btn-sm" onClick={() => setQuickNote('')}>Save</button>}>
            <textarea
              className="form-input w-full min-h-24"
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="Jot something..."
            />
          </Card>

          <Card title="Announcements">
            <ul className="space-y-2 text-sm">
              {announcements.map((a) => (
                <li key={a.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>{a.text}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${a.level === 'warn'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                    : 'bg-gray-100 dark:bg-gray-800'}`}>
                    {a.time}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Templates" action={<Link to="/app/templates" className="btn btn-outline btn-sm">View All</Link>}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {featuredTemplates.map((t) => (
              <div key={t.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <p className="font-medium">{t.name}</p>
                <button className="btn btn-secondary btn-sm mt-2">Use Template</button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Shared Items" action={<Link to="/app/files" className="btn btn-outline btn-sm">Open</Link>}>
          <ul className="space-y-2 text-sm">
            {shared.map((s) => (
              <li key={s.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span>{s.name}</span>
                <span className="text-xs text-gray-500">{s.owner}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Favorites">
          <ul className="space-y-2 text-sm">
            {favorites.map((f) => (
              <li key={f.id} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">{f.name}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
