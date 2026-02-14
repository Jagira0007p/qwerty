import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ messages: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated in this session
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
      const [messagesRes, projectsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/admin/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/admin/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setMessages(messagesRes.data);
      setProjects(projectsRes.data);
      setStats({
        messages: messagesRes.data.length,
        projects: projectsRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In production, this should be validated on the backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          password: password,
        },
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuthenticated", "true");
        sessionStorage.setItem("adminToken", response.data.token);
        fetchData();
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminToken");
    setPassword("");
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const token = sessionStorage.getItem("adminToken");
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/messages/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setMessages(messages.filter((msg) => msg._id !== id));
        setStats((prev) => ({ ...prev, messages: prev.messages - 1 }));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const deleteProject = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this project request?")
    ) {
      try {
        const token = sessionStorage.getItem("adminToken");
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProjects(projects.filter((proj) => proj._id !== id));
        setStats((prev) => ({ ...prev, projects: prev.projects - 1 }));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full minimal-card"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-semibold text-text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-tertiary text-sm">
              Enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-text-tertiary text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                         focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                placeholder="Enter admin password"
                required
                autoFocus
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-text-primary text-background text-sm font-medium tracking-wide 
                       hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="loading-dots justify-center">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-tertiary text-xs">
              Default password: admin123 (for development only)
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Loading
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="pt-20 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="display-medium">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-[#222222] text-text-secondary 
                     hover:text-text-primary hover:border-[#404040] transition-all text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="minimal-card"
          >
            <h2 className="text-text-tertiary text-sm tracking-wide mb-2">
              Total Messages
            </h2>
            <p className="display-medium text-text-primary">{stats.messages}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="minimal-card"
          >
            <h2 className="text-text-tertiary text-sm tracking-wide mb-2">
              Project Requests
            </h2>
            <p className="display-medium text-text-primary">{stats.projects}</p>
          </motion.div>
        </div>

        {/* Contact Messages */}
        <div className="mb-12">
          <h2 className="text-xl font-display font-semibold mb-6 text-text-primary">
            Contact Messages
          </h2>
          {messages.length === 0 ? (
            <p className="text-text-tertiary text-center py-8">
              No messages yet
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message._id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="minimal-card relative group"
                >
                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                             transition-opacity text-text-tertiary hover:text-red-400"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex justify-between items-start mb-2 pr-8">
                    <h3 className="font-medium text-text-primary">
                      {message.name}
                    </h3>
                    <span className="text-text-tertiary text-xs">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-text-tertiary text-sm mb-2">
                    {message.email}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {message.message}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Project Requests */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-6 text-text-primary">
            Project Requests
          </h2>
          {projects.length === 0 ? (
            <p className="text-text-tertiary text-center py-8">
              No project requests yet
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="minimal-card relative group"
                >
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                             transition-opacity text-text-tertiary hover:text-red-400"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex justify-between items-start mb-2 pr-8">
                    <h3 className="font-medium text-text-primary">
                      {project.name}
                    </h3>
                    <span className="text-text-tertiary text-xs">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-text-tertiary text-sm mb-1">
                    Company: {project.company || "Not specified"}
                  </p>
                  <p className="text-text-tertiary text-sm mb-2">
                    Budget: {project.budget}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
