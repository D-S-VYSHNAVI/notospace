export default function PublicCareers() {
  const roles = [
    { title: 'Frontend Engineer', location: 'Remote', type: 'Full-time' },
    { title: 'Product Designer', location: 'Remote', type: 'Full-time' },
  ];

  return (
    <div className="container-pro py-16 space-y-8 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white">Careers</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Join a small, passionate team crafting a focused, fast, and delightful workspace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((r) => (
          <div
            key={r.title}
            className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{r.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{r.location} • {r.type}</p>
            <button className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-md transition-all duration-300">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-sm mt-8">
        We value creativity, collaboration, and curiosity. Come be part of our journey!
      </p>
    </div>
  );
}
