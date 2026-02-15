import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Headline with Gradient */}
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          Finish your work <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            faster than ever.
          </span>
        </h1>

        <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          The simple, user-first task manager designed to help you stay organized and hit your deadlines.
        </p>

        {/* High-Contrast Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Get Started
          </Link>
          <Link 
            href="/register" 
            className="px-10 py-4 bg-slate-100 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-200 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}