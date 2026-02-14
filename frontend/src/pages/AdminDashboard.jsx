import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ messages: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Base API URL from .env
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      const [messagesRes, projectsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/admin/messages`, { headers }),
        axios.get(`${API_BASE}/api/admin/projects`, { headers }),
      ]);

      setMessages(messagesRes.data);
      setProjects(projectsRes.data);
      setStats({
        messages: messagesRes.data.length,
        projects: projectsRes.data.length,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Calling the new backend login route
      const response = await axios.post(`${API_BASE}/api/admin/login`, {
        password: password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuthenticated", "true");
        sessionStorage.setItem("adminToken", response.data.token);
        fetchData();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    setPassword("");
  };

  const deleteItem = async (id, type) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      const token = sessionStorage.getItem("adminToken");
      await axios.delete(`${API_BASE}/api/admin/${type}s/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (type === "message") {
        setMessages(messages.filter((m) => m._id !== id));
        setStats((prev) => ({ ...prev, messages: prev.messages - 1 }));
      } else {
        setProjects(projects.filter((p) => p._id !== id));
        setStats((prev) => ({ ...prev, projects: prev.projects - 1 }));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-8 bg-[#111] border border-[#222] rounded-2xl shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:border-white outline-none transition-all"
              placeholder="Enter Password"
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-red-900 text-red-500 hover:bg-red-950 rounded-full transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 bg-[#111] border border-[#222] rounded-2xl">
            <p className="text-gray-400 text-sm mb-1">Messages</p>
            <p className="text-4xl font-mono">{stats.messages}</p>
          </div>
          <div className="p-8 bg-[#111] border border-[#222] rounded-2xl">
            <p className="text-gray-400 text-sm mb-1">Project Requests</p>
            <p className="text-4xl font-mono">{stats.projects}</p>
          </div>
        </div>

        {/* Messages List */}
        <h2 className="text-2xl font-bold mb-6">Recent Messages</h2>
        <div className="grid gap-4 mb-12">
          {messages.map((m) => (
            <div
              key={m._id}
              className="p-6 bg-[#111] border border-[#222] rounded-xl relative group"
            >
              <button
                onClick={() => deleteItem(m._id, "message")}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                Delete
              </button>
              <h3 className="font-bold">
                {m.name}{" "}
                <span className="text-gray-500 font-normal text-sm">
                  — {m.email}
                </span>
              </h3>
              <p className="text-gray-400 mt-2">{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
