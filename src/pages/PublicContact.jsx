import { Mail, Phone } from 'lucide-react';

export default function PublicContact() {
  return (
    <div className="container-pro py-16 space-y-12 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white">Contact</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Have questions or want to work together? Reach out to us!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form className="card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 space-y-5">
          <div>
            <label className="form-label text-gray-700 dark:text-gray-300">Name</label>
            <input
              className="form-input mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="form-label text-gray-700 dark:text-gray-300">Email</label>
            <input
              className="form-input mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="form-label text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              className="form-input mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 min-h-32 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="How can we help?"
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 space-y-6">
          <div className="flex items-center space-x-3">
            <Mail className="text-indigo-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">support@notospace.dev</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-indigo-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Sales</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">sales@notospace.dev</p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
            We typically respond within 24 hours. We’re excited to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
}
