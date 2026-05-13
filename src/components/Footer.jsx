export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 py-8 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} Credex AI Audit. An assignment for the Credex Web Development Internship.</p>
        <p className="text-sm mt-2">This is a demo project and not a real service.</p>
      </div>
    </footer>
  );
}
