export default function Help() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card md:col-span-2">
        <h2 className="text-lg font-semibold">Help & Support</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium">FAQ</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">How do I create a new note?</li>
              <li className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">How to use templates?</li>
              <li className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">Where is my data stored?</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">support@notospace.dev</p>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-medium">Status</h3>
        <ul className="mt-3 text-sm space-y-2">
          <li>API: Operational</li>
          <li>Realtime: Operational</li>
          <li>Database: Operational</li>
        </ul>
      </div>
    </div>
  )
}


