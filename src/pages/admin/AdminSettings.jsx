export default function AdminSettings() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="font-medium">General</h3>
        <div className="mt-3 space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" /> Maintenance mode
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked /> Enable analytics
          </label>
        </div>
      </div>
      <div className="card">
        <h3 className="font-medium">Security</h3>
        <div className="mt-3 space-y-3 text-sm">
          <button className="btn btn-outline">Rotate API Keys</button>
          <button className="btn btn-outline">Download Audit Log</button>
        </div>
      </div>
    </div>
  )
}


