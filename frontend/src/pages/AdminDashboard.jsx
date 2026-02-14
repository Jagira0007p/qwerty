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

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [messagesRes, projectsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/messages"),
        axios.get("http://localhost:5000/api/admin/projects"),
      ]);
      setMessages(messagesRes.data);
      setProjects(projectsRes.data);
      setStats({
        messages: messagesRes.data.length,
        projects: projectsRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="max-w-md w-full minimal-card">
          <h1 className="text-2xl font-display font-semibold text-center mb-8 text-text-primary">
            Admin Access
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                       focus:border-[#404040] focus:outline-none transition-colors text-text-primary mb-6"
            />
            <button
              type="submit"
              className="w-full py-3 bg-text-primary text-background text-sm font-medium tracking-wide 
                       hover:bg-opacity-90 transition-all"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

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

  return (
    <div className="pt-20 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="display-medium mb-12">Admin Dashboard</h1>

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
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="minimal-card"
              >
                <div className="flex justify-between items-start mb-2">
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
                <p className="text-text-secondary text-sm">{message.message}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Requests */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-6 text-text-primary">
            Project Requests
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="minimal-card"
              >
                <div className="flex justify-between items-start mb-2">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
