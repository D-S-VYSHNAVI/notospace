import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: '📝',
      title: 'Rich Notes',
      description: 'Markdown support, code blocks, and seamless embeds for comprehensive documentation.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '✅',
      title: 'Task Management',
      description: 'Kanban boards, priority tracking, and deadline management for optimal productivity.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📅',
      title: 'Smart Calendar',
      description: 'Integrated scheduling with smart reminders and time-blocking capabilities.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🗄️',
      title: 'Databases',
      description: 'Flexible data organization with tables, filters, and custom views.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: '📋',
      title: 'Templates',
      description: '100+ pre-built templates for every workflow and use case.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Beautiful dark theme designed for developers and night owls.',
      color: 'from-gray-500 to-gray-600'
    }
  ]

  const templates = [
    { name: 'Project Management', category: 'Productivity', color: 'bg-blue-500' },
    { name: 'Study Planner', category: 'Education', color: 'bg-green-500' },
    { name: 'Personal CRM', category: 'Business', color: 'bg-purple-500' },
    { name: 'Content Calendar', category: 'Marketing', color: 'bg-orange-500' },
    { name: 'Meeting Notes', category: 'Work', color: 'bg-pink-500' },
    { name: 'Habit Tracker', category: 'Personal', color: 'bg-indigo-500' },
    { name: 'Budget Planner', category: 'Finance', color: 'bg-emerald-500' },
    { name: 'Reading List', category: 'Learning', color: 'bg-rose-500' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-strong border-b border-gray-200 dark:border-gray-800 shadow-soft' 
          : 'bg-transparent'
      }`}>
        <div className="container-pro">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                NS
              </div>
              <span className="font-display font-semibold text-xl text-gradient">Notospace</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Features
              </a>
              <a href="#templates" className="nav-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Templates
              </a>
              <Link to="/about" className="nav-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</Link>
              <Link to="/contact" className="nav-link text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</Link>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate(user.role === 'admin' ? '/admin' : '/app')}
                >
                  Open App
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-200 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '4s'}}></div>

          <div className="container-pro relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div className="space-y-8" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:'easeOut'}}>
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                    Your all-in-one
                    <span className="text-gradient block">workspace</span>
                    for productivity
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                    Notospace combines notes, tasks, databases, and templates into one powerful, 
                    beautiful interface designed for modern productivity.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/signup?role=student" 
                    className="btn btn-primary btn-xl group"
                  >
                    Start Free Trial
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link 
                    to="/login?role=student" 
                    className="btn btn-outline btn-xl"
                  >
                    Student Login
                  </Link>
                  <Link 
                    to="/login?role=admin" 
                    className="btn btn-ghost btn-xl"
                  >
                    Admin Login
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free forever
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No credit card required
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.15,ease:'easeOut'}}>
                <div className="glass-strong rounded-3xl p-8 shadow-large border border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-2 gap-6">
                    {['Notes', 'Tasks', 'Calendar', 'Database'].map((item, index) => (
                      <motion.div 
                        key={item}
                        className="card card-hover group cursor-pointer"
                        initial={{opacity:0, y:12}}
                        whileInView={{opacity:1, y:0}}
                        viewport={{once:true, amount:0.4}}
                        transition={{duration:0.4, delay:index*0.05}}
                      >
                        <div className={`h-20 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform duration-200`}>
                          {features[index]?.icon || '📄'}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {features[index]?.description?.split('.')[0] || 'Powerful tool for productivity'}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container-pro">
            <motion.div className="text-center mb-16" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                Everything you need to
                <span className="text-gradient"> stay organized</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Powerful features designed to boost your productivity and keep your work organized in one beautiful interface.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  className="card card-hover group"
                  initial={{opacity:0, y:16}}
                  whileInView={{opacity:1, y:0}}
                  viewport={{once:true, amount:0.3}}
                  transition={{duration:0.4, delay:index*0.05}}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-24">
          <div className="container-pro">
            <motion.div className="text-center mb-16" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                <span className="text-gradient">100+ Templates</span> to get started
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Jump-start any project with our professionally designed templates for every use case.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <motion.div 
                  key={template.name}
                  className="card card-interactive group"
                  initial={{opacity:0, y:16}}
                  whileInView={{opacity:1, y:0}}
                  viewport={{once:true, amount:0.3}}
                  transition={{duration:0.4, delay:index*0.05}}
                >
                  <div className={`w-full h-24 rounded-lg mb-4 flex items-center justify-center text-2xl font-bold group-hover:scale-105 transition-transform duration-200 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200`}>
                    {template.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {template.category}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/app/templates" className="btn btn-outline btn-lg">
                View All Templates
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container-pro">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                  Built for
                  <span className="text-gradient"> developers</span> and creators
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Notospace was designed with developers in mind. Clean interfaces, powerful features, 
                  and the flexibility to adapt to your workflow. Whether you're managing projects, 
                  taking notes, or organizing your learning, we've got you covered.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Real-time collaboration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Offline-first architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">API-first design</span>
                  </div>
                </div>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="glass-strong rounded-3xl p-8 shadow-large">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">
                        NS
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notospace</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All-in-one workspace</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 rounded-full w-3/4"></div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-1/2"></div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 dark:bg-gray-950 text-white">
        <div className="container-pro py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white font-bold text-sm">
                  NS
                </div>
                <span className="font-display font-semibold text-xl">Notospace</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The all-in-one workspace for modern productivity. Built for developers, creators, and teams.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#templates" className="block text-gray-400 hover:text-white transition-colors">Templates</a>
                <Link to="/pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</Link>
                <Link to="/api" className="block text-gray-400 hover:text-white transition-colors">API</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/support" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
                <Link to="/docs" className="block text-gray-400 hover:text-white transition-colors">Documentation</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Status</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Notospace. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


