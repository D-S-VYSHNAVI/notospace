export default function PublicDocs() {
  const apis = ['Notes API', 'Tasks API', 'Database API'];

  return (
    <div className="container-pro py-16 space-y-12 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white">Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Everything you need to get started with our platform and APIs.
        </p>
      </div>

      {/* Getting Started Card */}
      <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
        <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">Getting Started</h3>
        <ol className="list-decimal pl-5 text-sm mt-2 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Create an account</li>
          <li>Pick a template</li>
          <li>Customize your workspace</li>
        </ol>
      </div>

      {/* API Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {apis.map((api) => (
          <div
            key={api}
            className="card bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{api}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Endpoints, usage examples, and guides to get you started quickly.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
