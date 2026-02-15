import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#c8d3c7] px-6 text-center">
      
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Finish your tasks <br />
        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          faster than ever
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
        Simple task manager application to help you stay organized.  
        Create tasks, update them, mark them as completed, and delete active tasks if no longer needed.  
        Sign up or log in to start managing your tasks.
      </p>

      {/* Features */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Add & Edit Tasks</h3>
          <p className="text-slate-600 text-sm">
            Quickly create new tasks or update existing ones.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Mark as Completed</h3>
          <p className="text-slate-600 text-sm">
            Easily mark tasks as done to keep track of progress.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Delete Tasks</h3>
          <p className="text-slate-600 text-sm">
            Delete active task when it's no longer needed.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/login"
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-8 py-3 bg-slate-100 text-slate-700 rounded-full font-semibold text-lg hover:bg-slate-200 transition"
        >
          Create Account
        </Link>
      </div>

    </div>
  );
}
