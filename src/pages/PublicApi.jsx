import { Lock, FileText } from 'lucide-react';

export default function PublicApi() {
  const apiEndpoints = [
    {
      title: 'Authentication',
      description: 'Login to access your workspace securely.',
      endpoint: 'POST /api/login',
      icon: <Lock className="w-5 h-5 mr-2" />,
      color: 'bg-red-100 text-red-700'
    },
    {
      title: 'Notes',
      description: 'Fetch all your notes from the database.',
      endpoint: 'GET /api/notes',
      icon: <FileText className="w-5 h-5 mr-2" />,
      color: 'bg-blue-100 text-blue-700'
    }
  ];

  return (
    <div className="container-pro py-16 space-y-10">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-center text-gray-900 dark:text-gray-100">
        API Endpoints
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {apiEndpoints.map((api, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${api.color}`}
          >
            <h3 className="flex items-center font-semibold text-lg mb-2">
              {api.icon} {api.title}
            </h3>
            <p className="text-sm mb-3">{api.description}</p>
            <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded font-mono">
              {api.endpoint}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
