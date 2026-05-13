import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runAudit } from '../utils/auditEngine';
import { supabase } from '../services/supabase';
import ResultsDashboard from './ResultsDashboard';
import * as Lucide from 'lucide-react';

const allTools = [
  "Select a Tool", "Cursor", "GitHub Copilot", "Claude", "ChatGPT", 
  "Anthropic API", "OpenAI API", "Gemini", "Windsurf"
];

export default function AuditForm() {
  const [selectedTool, setSelectedTool] = useState(allTools[0]);
  const [toolData, setToolData] = useState({ plan: '', monthlySpend: '' });
  const [teamSize, setTeamSize] = useState('');
  
  const [auditResult, setAuditResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Loader = Lucide.Loader || Lucide.RefreshCw || 'div';

  const handleInputChange = (field, value) => {
    setToolData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      teamSize: teamSize,
      tools: {
        [selectedTool]: toolData,
      },
    };
    
    try {
        const result = runAudit(formData);
        result.aiSummary = "Your stack shows potential for optimization. By centralizing your API usage and right-sizing team plans, you can reduce overhead by up to 35%.";

        if (supabase) {
            const { data, error } = await supabase.from('reports').insert([{ data: result }]).select();
            if (data && data[0]) {
              navigate(`/report/${data[0].id}`);
              return;
            }
        }
        
        setAuditResult(result);
    } catch (err) {
        console.error("Audit failed:", err);
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <div className="animate-spin text-blue-500 mb-4">
           {typeof Loader === 'string' ? 'Loading...' : <Loader size={48} />}
        </div>
        <p className="text-slate-400">Analyzing your spend...</p>
      </div>
    );
  }

  if (auditResult) {
    return <ResultsDashboard auditResult={auditResult} />;
  }

  return (
    <section id="audit-form" className="container mx-auto px-4 pb-20">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold text-slate-100 text-center">Analyze Your AI Spend</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Select an AI Tool</label>
            <select
              value={selectedTool}
              onChange={e => setSelectedTool(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {allTools.map(tool => (
                <option key={tool} value={tool} disabled={tool === "Select a Tool"}>{tool}</option>
              ))}
            </select>
          </div>

          {selectedTool !== "Select a Tool" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Team Size</label>
                <input
                  type="number"
                  value={teamSize}
                  onChange={e => setTeamSize(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Number of developers using this tool"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Plan</label>
                <input
                  type="text"
                  value={toolData.plan}
                  onChange={e => handleInputChange('plan', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Pro, Team"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Spend ($)</label>
                <input
                  type="number"
                  value={toolData.monthlySpend}
                  onChange={e => handleInputChange('monthlySpend', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., 200"
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
            disabled={selectedTool === "Select a Tool"}
          >
            Generate Savings Report
          </button>
        </div>
      </form>
    </section>
  );
}
