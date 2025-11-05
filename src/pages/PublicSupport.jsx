import { HelpCircle, Mail } from 'lucide-react';

export default function PublicSupport() {
  const helpTopics = ['Getting Started', 'Workspace Management', 'Templates'];

  return (
    <div className="container-pro py-16 space-y-12 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white">Support</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Need help? Explore our resources or reach out to our support team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Help Center */}
        <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="text-indigo-500 w-5 h-5" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Help Center</h3>
          </div>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
            {helpTopics.map((topic) => (
              <li key={topic} className="hover:text-indigo-500 transition-colors cursor-pointer">
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-indigo-500 w-5 h-5" />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">Contact</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">support@notospace.dev</p>
        </div>
      </div>
    </div>
  );
}
