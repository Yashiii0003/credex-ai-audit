import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { runAudit } from '../utils/auditEngine';
import { supabase } from '../services/supabase';
import ToolCard from './ToolCard';
import ResultsDashboard from './ResultsDashboard';
import * as Lucide from 'lucide-react';

const tools = [
  "Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", 
  "OpenAI API", "Gemini", "Windsurf"
];

export default function AuditForm() {
  const [formData, setFormData] = useLocalStorage('stacksave_form_data', {
    teamSize: '',
    primaryUseCase: '',
    tools: {},
  });
  const [auditResult, setAuditResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Safety icon component
  const Loader = Lucide.Loader || Lucide.RefreshCw || 'div';

  const handleToolChange = (toolName, field, value) => {
    setFormData(prev => ({
      ...prev,
      tools: {
        ...prev.tools,
        [toolName]: {
          ...prev.tools[toolName],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const result = runAudit(formData);
        
        // Mock AI Summary
        result.aiSummary = "Your stack shows potential for optimization. By centralizing your API usage and right-sizing team plans, you can reduce overhead by up to 35%.";

        if (supabase) {
            const { data, error } = await supabase
              .from('reports')
              .insert([{ data: result }])
              .select();

            if (data && data[0]) {
              navigate(`/report/${data[0].id}`);
              return;
            }
        }
        
        // Fallback if supabase is not connected
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
        <p className="text-slate-400">Analyzing your stack...</p>
      </div>
    );
  }

  if (auditResult) {
    return <ResultsDashboard auditResult={auditResult} />;
  }

  return (
    <section id="audit-form" className="container mx-auto px-4 pb-20">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-slate-100">Your AI Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Team Size</label>
              <input
                type="number"
                value={formData.teamSize}
                onChange={e => setFormData({...formData, teamSize: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Number of seats"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Primary Use Case</label>
              <input
                type="text"
                value={formData.primaryUseCase}
                onChange={e => setFormData({...formData, primaryUseCase: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Engineering"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(tool => (
              <ToolCard
                key={tool}
                toolName={tool}
                data={formData.tools[tool] || {}}
                onChange={handleToolChange}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Generate Savings Report
          </button>
        </div>
      </form>
    </section>
  );
}
