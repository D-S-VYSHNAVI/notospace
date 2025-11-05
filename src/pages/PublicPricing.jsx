import { Check } from 'lucide-react';

export default function PublicPricing() {
  const tiers = [
    { name: 'Free', price: '$0', features: ['Unlimited notes', 'Basic templates', 'Community support'] },
    { name: 'Pro', price: '$8', features: ['All templates', 'Priority support', 'Advanced features'], highlight: true },
    { name: 'Team', price: '$15', features: ['Team workspaces', 'Permissions', 'Admin tools'] },
  ];

  return (
    <div className="container-pro py-16 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-5xl font-display font-bold text-center text-gray-900 dark:text-white">Pricing</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
        Choose a plan that fits your needs. Upgrade anytime.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card p-8 rounded-2xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              t.highlight ? 'border-2 border-indigo-500 scale-105' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t.name}</h3>
            <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
              {t.price}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">/mo</span>
            </p>

            <ul className="mt-6 text-sm space-y-3 text-gray-700 dark:text-gray-300">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="text-indigo-500 w-4 h-4" /> {f}
                </li>
              ))}
            </ul>

            <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
              Get {t.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
