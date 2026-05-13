import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="text-blue-500" size={28} />
            <span className="text-xl font-bold">Credex AI Audit</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <a href="https://github.com/Yashiii0003/credex-ai-audit.git" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">GitHub</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
