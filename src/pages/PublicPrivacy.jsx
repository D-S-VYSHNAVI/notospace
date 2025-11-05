export default function PublicPrivacy() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.',
    },
    {
      title: 'Information We Collect',
      content:
        'We may collect information you provide directly to us, such as your name, email, and usage data when using our services.',
    },
    {
      title: 'How We Use Information',
      content:
        'Your information is used to provide, maintain, and improve our services, communicate with you, and ensure security.',
    },
    {
      title: 'Cookies & Tracking',
      content:
        'We use cookies and similar tracking technologies to enhance user experience and analyze site traffic.',
    },
    {
      title: 'Third-Party Sharing',
      content:
        'We do not sell your personal information. We may share data with trusted third-party service providers only as needed.',
    },
  ];

  return (
    <div className="container-pro py-16 space-y-8 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          We value your privacy and are committed to protecting your personal information.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((sec) => (
          <div
            key={sec.title}
            className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">{sec.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
