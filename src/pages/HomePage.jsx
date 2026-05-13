import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AuditForm from '../components/AuditForm';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <AuditForm />
      </main>
      <Footer />
    </div>
  );
}
