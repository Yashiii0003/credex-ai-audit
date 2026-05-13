import * as Lucide from 'lucide-react';
import SummaryCard from './SummaryCard';

export default function ResultsDashboard({ auditResult, isPublic = false }) {
  if (!auditResult) return null;

  // Safety icons
  const DollarSign = Lucide.DollarSign || 'span';
  const TrendingUp = Lucide.TrendingUp || 'span';
  const Zap = Lucide.Zap || 'span';

  const { totalMonthlySavings = 0, totalAnnualSavings = 0, recommendations = [], aiSummary = "" } = auditResult;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8">
            <div className="flex items-center text-emerald-400 mb-2">
              <DollarSign size={20} />
              <span className="ml-2 font-semibold">Monthly Savings</span>
            </div>
            <p className="text-5xl font-bold text-emerald-50">
                ${Number(totalMonthlySavings).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8">
            <div className="flex items-center text-emerald-400 mb-2">
              <TrendingUp size={20} />
              <span className="ml-2 font-semibold">Annual Savings</span>
            </div>
            <p className="text-5xl font-bold text-emerald-50">
                ${Number(totalAnnualSavings).toLocaleString(undefined, {minimumFractionDigits: 2})}
            </p>
          </div>
        </div>

        <SummaryCard summary={aiSummary} />

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-8 text-slate-100">Savings Breakdown</h3>
          <div className="grid gap-4">
            {recommendations.length > 0 ? recommendations.map((rec, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start space-x-4">
                <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-100">{rec.recommendation}</h4>
                  <p className="text-slate-400 mt-1">{rec.reasoning}</p>
                </div>
              </div>
            )) : (
                <p className="text-slate-500 italic">No specific recommendations found.</p>
            )}
          </div>
        </div>

        {totalMonthlySavings > 500 && !isPublic && (
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-center shadow-xl shadow-blue-500/20">
            <h3 className="text-3xl font-bold text-white">Unlock Expert Savings</h3>
            <p className="text-blue-100 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
              Your savings potential is in the top 5% of companies. Book a free 15-minute 
              session with a Credex expert to build a custom AI optimization roadmap.
            </p>
            <button className="mt-8 bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg">
              Book Free Strategy Session
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
