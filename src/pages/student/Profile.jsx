import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Calendar, Award, Briefcase, Edit, Save, X, BookOpen, Code, Database, FileText, Zap } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || 'user@example.com',
    role: user?.role || 'Student',
    joinedDate: 'January 2023',
    about: 'Computer Science student passionate about web development and AI. Currently working on building productivity tools and learning React.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'UI/UX Design'],
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'Mobile Apps'],
    achievements: [
      { id: 1, title: 'Completed React Course', date: 'March 2023', icon: <Code className="w-4 h-4" /> },
      { id: 2, title: 'Built First MERN App', date: 'May 2023', icon: <Database className="w-4 h-4" /> },
      { id: 3, title: 'Published Research Paper', date: 'August 2023', icon: <FileText className="w-4 h-4" /> }
    ],
    projects: [
      { id: 1, title: 'Notion Clone', description: 'A productivity app with notes, tasks and more', status: 'In Progress' },
      { id: 2, title: 'AI Study Assistant', description: 'Tool that helps summarize study materials', status: 'Planning' }
    ],
    recentActivity: [
      { id: 1, action: 'Created note', target: 'Project Ideas', time: '2 hours ago' },
      { id: 2, action: 'Completed task', target: 'Research React Hooks', time: 'Yesterday' },
      { id: 3, action: 'Uploaded file', target: 'Research Paper.pdf', time: '3 days ago' }
    ]
  })

  // Mock function to save profile changes
  const saveChanges = () => {
    setEditMode(false)
    // In a real app, this would send data to backend
    console.log('Saving profile data:', profileData)
  }

  return (
    <div className="space-y-6">
      {/* Header with avatar and basic info */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center text-4xl font-bold">
              {profileData.name.charAt(0) || 'S'}
            </div>
            {!editMode && (
              <button 
                className="btn btn-outline btn-sm mt-3 flex items-center gap-1"
                onClick={() => setEditMode(true)}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <span className="badge badge-primary">{profileData.role}</span>
            </div>
            
            <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {profileData.joinedDate}</span>
              </div>
            </div>
            
            {editMode && (
              <div className="flex gap-2 mt-4">
                <button 
                  className="btn btn-primary flex items-center gap-1"
                  onClick={saveChanges}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button 
                  className="btn btn-outline flex items-center gap-1"
                  onClick={() => setEditMode(false)}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6 md:col-span-2">
          {/* About Me */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">About Me</h2>
              {editMode && (
                <button className="btn btn-ghost btn-sm">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {editMode ? (
              <textarea 
                className="form-input h-32 w-full"
                value={profileData.about}
                onChange={(e) => setProfileData({...profileData, about: e.target.value})}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{profileData.about}</p>
            )}
          </div>
          
          {/* Skills & Interests */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Skills & Interests</h2>
              {editMode && (
                <button className="btn btn-ghost btn-sm">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  Skills
                </h3>
                
                {editMode ? (
                  <div className="space-y-2">
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input 
                          className="form-input flex-1"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...profileData.skills]
                            newSkills[index] = e.target.value
                            setProfileData({...profileData, skills: newSkills})
                          }}
                        />
                        <button 
                          className="btn btn-ghost btn-sm text-red-500"
                          onClick={() => {
                            const newSkills = profileData.skills.filter((_, i) => i !== index)
                            setProfileData({...profileData, skills: newSkills})
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      className="btn btn-outline btn-sm w-full"
                      onClick={() => {
                        setProfileData({
                          ...profileData, 
                          skills: [...profileData.skills, '']
                        })
                      }}
                    >
                      Add Skill
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span key={index} className="badge badge-outline">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Interests
                </h3>
                
                {editMode ? (
                  <div className="space-y-2">
                    {profileData.interests.map((interest, index) => (
                      <div key={index} className="flex gap-2">
                        <input 
                          className="form-input flex-1"
                          value={interest}
                          onChange={(e) => {
                            const newInterests = [...profileData.interests]
                            newInterests[index] = e.target.value
                            setProfileData({...profileData, interests: newInterests})
                          }}
                        />
                        <button 
                          className="btn btn-ghost btn-sm text-red-500"
                          onClick={() => {
                            const newInterests = profileData.interests.filter((_, i) => i !== index)
                            setProfileData({...profileData, interests: newInterests})
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      className="btn btn-outline btn-sm w-full"
                      onClick={() => {
                        setProfileData({
                          ...profileData, 
                          interests: [...profileData.interests, '']
                        })
                      }}
                    >
                      Add Interest
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <span key={index} className="badge badge-outline">
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Projects */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Projects</h2>
              {editMode && (
                <button className="btn btn-ghost btn-sm">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="space-y-4">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="card p-4 border dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="text-xs font-medium">Title</label>
                        <input 
                          className="form-input w-full"
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...profileData.projects]
                            newProjects[index].title = e.target.value
                            setProfileData({...profileData, projects: newProjects})
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Status</label>
                        <select 
                          className="form-input w-full"
                          value={project.status}
                          onChange={(e) => {
                            const newProjects = [...profileData.projects]
                            newProjects[index].status = e.target.value
                            setProfileData({...profileData, projects: newProjects})
                          }}
                        >
                          <option>Planning</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium">Description</label>
                      <input 
                        className="form-input w-full"
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...profileData.projects]
                          newProjects[index].description = e.target.value
                          setProfileData({...profileData, projects: newProjects})
                        }}
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button 
                        className="btn btn-ghost btn-sm text-red-500"
                        onClick={() => {
                          const newProjects = profileData.projects.filter((_, i) => i !== index)
                          setProfileData({...profileData, projects: newProjects})
                        }}
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="btn btn-outline btn-sm w-full"
                  onClick={() => {
                    setProfileData({
                      ...profileData, 
                      projects: [...profileData.projects, {
                        id: Date.now(),
                        title: '',
                        description: '',
                        status: 'Planning'
                      }]
                    })
                  }}
                >
                  Add Project
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {profileData.projects.map(project => (
                  <div key={project.id} className="card p-4 border dark:border-gray-700">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{project.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : project.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Achievements</h2>
              {editMode && (
                <button className="btn btn-ghost btn-sm">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {editMode ? (
              <div className="space-y-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <input 
                        className="form-input w-full mb-1"
                        placeholder="Achievement title"
                        value={achievement.title}
                        onChange={(e) => {
                          const newAchievements = [...profileData.achievements]
                          newAchievements[index].title = e.target.value
                          setProfileData({...profileData, achievements: newAchievements})
                        }}
                      />
                      <input 
                        className="form-input w-full text-sm"
                        placeholder="Date"
                        value={achievement.date}
                        onChange={(e) => {
                          const newAchievements = [...profileData.achievements]
                          newAchievements[index].date = e.target.value
                          setProfileData({...profileData, achievements: newAchievements})
                        }}
                      />
                    </div>
                    <button 
                      className="btn btn-ghost btn-sm text-red-500 self-start"
                      onClick={() => {
                        const newAchievements = profileData.achievements.filter((_, i) => i !== index)
                        setProfileData({...profileData, achievements: newAchievements})
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  className="btn btn-outline btn-sm w-full"
                  onClick={() => {
                    setProfileData({
                      ...profileData, 
                      achievements: [...profileData.achievements, {
                        id: Date.now(),
                        title: '',
                        date: '',
                        icon: <Award className="w-4 h-4" />
                      }]
                    })
                  }}
                >
                  Add Achievement
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {profileData.achievements.map(achievement => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      {achievement.icon || <Award className="w-4 h-4 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {profileData.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>
                      {' '}{activity.target}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


