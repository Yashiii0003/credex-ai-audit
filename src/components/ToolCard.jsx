export default function ToolCard({ toolName, data, onChange }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
      <h3 className="font-bold text-lg mb-3">{toolName}</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Plan (e.g., Pro)"
          value={data.plan || ''}
          onChange={e => onChange(toolName, 'plan', e.target.value)}
          className="w-full bg-slate-700 rounded p-2 text-sm"
        />
        <input
          type="number"
          placeholder="Monthly Spend ($)"
          value={data.monthlySpend || ''}
          onChange={e => onChange(toolName, 'monthlySpend', e.target.value)}
          className="w-full bg-slate-700 rounded p-2 text-sm"
        />
        <input
          type="number"
          placeholder="Seats"
          value={data.seats || ''}
          onChange={e => onChange(toolName, 'seats', e.target.value)}
          className="w-full bg-slate-700 rounded p-2 text-sm"
        />
      </div>
    </div>
  );
}
