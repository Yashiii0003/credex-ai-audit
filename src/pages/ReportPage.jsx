import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import Navbar from '../components/Navbar';
import ResultsDashboard from '../components/ResultsDashboard';
import Footer from '../components/Footer';
import { Loader, AlertTriangle } from 'lucide-react';

export default function ReportPage() {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No report ID provided.");
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError("This feature is unavailable: Supabase is not configured.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('reports')
          .select('id, data, created_at') // Select created_at for metadata
          .eq('id', id)
          .single(); // Use .single() to get one record or an error

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (!data || !data.data) {
          throw new Error("Report data is invalid or missing.");
        }
        
        // For public reports, we could sanitize the data here if needed,
        // but for now, we pass it all and let the dashboard decide what to show.
        setReportData(data.data);

      } catch (err) {
        console.error('Error fetching report:', err);
        setError(`Could not retrieve report. It may have been deleted or the link is invalid.`);
      } finally {
        setLoading(false);
      }
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
          <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
          <p className="text-red-400">{error}</p>
        </div>
      );
    }
    if (reportData) {
      // The isPublic prop tells the dashboard to hide sensitive UI elements
      return <ResultsDashboard auditResult={reportData} isPublic={true} />;
    }
    return null; // Should not be reached if logic is correct
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
