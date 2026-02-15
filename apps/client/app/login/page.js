"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", 
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/my-tasks");
    } else {
      // This catches 400, 401, 404 errors from your backend
      setError(data.message || "Invalid credentials");
    }
  } catch (err) {
    // This catches network errors (CORS, Server Down)
    console.error("Fetch error:", err);
    setError("Cannot connect to server. Is the backend running?");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 mb-2">Welcome Back.</h2>
          <p className="text-slate-500">Enter your credentials to access your tasks.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-slate-900 text-white rounded-full font-bold text-lg transition-all mt-4 shadow-sm ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}