import { useState } from 'react';
import { supabase } from '../services/supabase';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function EmailCapture({ reportId }) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  // Honeypot field
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // Spam prevention

    setStatus('loading');
    
    const { error } = await supabase.from('leads').insert({
      email,
      company_name: companyName,
      role,
      team_size: teamSize,
      report_id: reportId,
    });

    if (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Supabase error:', error);
    } else {
      setStatus('success');
      setMessage('Success! Your report link has been sent.');
      setEmail('');
      setCompanyName('');
      setRole('');
      setTeamSize('');
    }
  };

  return (
    <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-center">Get Your Full Report</h3>
      <p className="text-slate-400 text-center mt-2 mb-6">
        Enter your email to receive a shareable link to your detailed savings report.
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="w-full bg-slate-800 border-slate-700 rounded-lg p-3"
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name (Optional)"
          className="w-full bg-slate-800 border-slate-700 rounded-lg p-3"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Role"
            className="w-full bg-slate-800 border-slate-700 rounded-lg p-3"
          />
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="Team Size"
            className="w-full bg-slate-800 border-slate-700 rounded-lg p-3"
          />
        </div>
        {/* Honeypot field, visually hidden */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: 'absolute', left: '-5000px' }}
          tabIndex="-1"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-all disabled:bg-slate-600"
        >
          {status === 'loading' ? 'Sending...' : 'Send Report'}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-center mt-4 text-green-400 flex items-center justify-center">
          <CheckCircle className="mr-2" /> {message}
        </p>
      )}
      {status === 'error' && (
        <p className="text-center mt-4 text-red-400 flex items-center justify-center">
          <AlertCircle className="mr-2" /> {message}
        </p>
      )}
    </div>
  );
}
