export default function PublicAbout() {
  const features = [
    {
      title: 'Performance',
      description: 'Optimized for speed and responsiveness, ensuring you never miss a beat.',
      color: 'bg-red-100 text-red-700'
    },
    {
      title: 'Design',
      description: 'Sleek and intuitive UI that makes organizing and working a joy.',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Flexibility',
      description: 'Highly customizable workspace to fit your unique workflow and needs.',
      color: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className="container-pro py-16 space-y-10">
      <h1 className="text-4xl md:text-5xl font-display font-bold text-center text-gray-900 dark:text-gray-100">
        About Notospace
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
        Notospace is an all-in-one workspace for notes, tasks, databases, and templates. Built
        for developers and teams who value speed, focus, and beautiful UX.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${feature.color}`}
          >
            <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
