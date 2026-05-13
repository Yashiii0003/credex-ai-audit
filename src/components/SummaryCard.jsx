import { Sparkles } from 'lucide-react';

export default function SummaryCard({ summary }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
      <div className="flex items-center mb-4">
        <Sparkles className="text-purple-400 mr-3" />
        <h3 className="text-xl font-bold text-purple-300">AI-Generated Summary</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">{summary}</p>
    </div>
  );
}
