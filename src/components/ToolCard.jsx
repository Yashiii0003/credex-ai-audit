import { X } from 'lucide-react';

export default function ToolCard({ toolName, data, onChange, onRemove }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
      <h3 className="font-bold text-lg mb-3">{toolName}</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Plan (e.g., Pro)"
          value={data.plan || ''}
          onChange={e => onChange(toolName, 'plan', e.target.value)}
          className="w-full bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          placeholder="Monthly Spend ($)"
          value={data.monthlySpend || ''}
          onChange={e => onChange(toolName, 'monthlySpend', e.target.value)}
          className="w-full bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
