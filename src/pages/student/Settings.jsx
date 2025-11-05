export default function Settings() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="font-medium">Notifications</h3>
        <div className="mt-3 space-y-3">
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked /> Weekly summary
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" /> Product updates
          </label>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" defaultChecked /> Task reminders
          </label>
        </div>
      </div>
      <div className="card">
        <h3 className="font-medium">Appearance</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="btn btn-secondary">Light</button>
          <button className="btn btn-primary">Dark</button>
        </div>
      </div>
      <div className="card md:col-span-2">
        <h3 className="font-medium">Data</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="btn btn-outline">Export JSON</button>
          <button className="btn btn-outline">Import JSON</button>
          <button className="btn btn-outline">Reset Workspace</button>
        </div>
      </div>
    </div>
  )
}


