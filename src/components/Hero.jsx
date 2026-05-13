export default function Hero() {
  return (
    <section className="py-20 sm:py-28 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 text-transparent bg-clip-text">
          Stop Overpaying for AI Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          StackSave AI analyzes your AI tool stack and uncovers hidden savings. Get a free, instant audit of your team's spending.
        </p>
        <div className="mt-8 flex justify-center">
          <a href="#audit-form" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
            Get Your Free Audit
          </a>
        </div>
      </div>
    </section>
  );
}
