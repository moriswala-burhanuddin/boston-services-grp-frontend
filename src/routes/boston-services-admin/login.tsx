import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert, Lock, User, ArrowRight } from "lucide-react";
import { setToken, getToken } from "@/lib/auth";

export const Route = createFileRoute("/boston-services-admin/login")({
  beforeLoad: () => {
    // If already logged in, redirect to admin dashboard
    if (getToken()) {
      throw redirect({
        to: "/boston-services-admin",
      });
    }
  },
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.access, data.refresh);
        navigate({ to: "/boston-services-admin" });
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff6b00]/10 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-10 border border-gray-100">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-[#ff6b00] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#ff6b00]/20 mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-ink tracking-tight mb-2">Admin Hub</h1>
            <p className="text-sm font-medium text-gray-400">Secure access required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all font-medium text-ink outline-none placeholder:text-gray-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all font-medium text-ink outline-none placeholder:text-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#ff6b00] hover:bg-[#e66000] text-white rounded-xl font-black tracking-widest text-[11px] uppercase transition-all shadow-xl shadow-[#ff6b00]/20 flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Unauthorized access is strictly prohibited
        </p>
      </div>
    </div>
  );
}
