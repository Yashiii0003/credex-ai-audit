import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import Navbar from '../components/Navbar';
import ResultsDashboard from '../components/ResultsDashboard';
import Footer from '../components/Footer';
import { Loader, AlertTriangle } from 'lucide-react'; // Corrected: LoaderCircle -> Loader

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured. Please check your .env file.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select('id, data')
        .eq('id', id)
        .single();

      if (error) {
        setError('Report not found or an error occurred.');
        console.error('Error fetching report:', error);
      } else {
        setReport(data);
      }
      setLoading(false);
    };

    fetchReport();
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-blue-500" size={48} />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertTriangle className="text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">An Error Occurred</h2>
          <p className="text-red-400">{error}</p>
        </div>
      );
    }
    if (report) {
      return <ResultsDashboard auditResult={report.data} isPublic={true} />;
    }
    return null;
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
