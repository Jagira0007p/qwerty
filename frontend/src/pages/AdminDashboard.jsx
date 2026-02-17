import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiFileText,
  FiTrash2,
  FiEye,
  FiX,
  FiLogOut,
  FiMessageSquare,
  FiBriefcase,
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ messages: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Base API URL from .env
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
    setMessages([]);
    setProjects([]);
  };

  const deleteItem = async (id, type) => {
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
      setDeleteConfirm(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const viewDetails = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="relative overflow-hidden bg-background min-h-screen flex items-center justify-center px-6">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#222] rounded-3xl filter blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative max-w-md w-full p-8 bg-[#111] border border-[#222] rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <HiOutlineSparkles className="w-8 h-8 text-text-secondary mr-2" />
              <h1 className="text-2xl font-display font-bold text-text-primary">
                Admin Access
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-[#333] rounded-lg text-text-primary focus:border-[#404040] outline-none transition-all pl-10"
                  placeholder="Enter Password"
                  required
                />
                <FiEye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4 group-hover:text-text-secondary transition-colors" />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                  >
                    <FiAlertCircle className="w-4 h-4" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-[#F5F5F5] to-[#CCCCCC] text-background font-medium rounded-lg hover:from-[#CCCCCC] hover:to-[#F5F5F5] transition-all disabled:opacity-50 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#CCCCCC] to-[#F5F5F5]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">
                  {loading ? "Authenticating..." : "Login"}
                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-background min-h-screen pt-24 pb-20 px-4 sm:px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-text-tertiary">
              Manage your messages and project requests
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-0 px-6 py-2 bg-[#111] border border-red-900/50 text-red-500 hover:bg-red-950/30 rounded-full transition-all flex items-center space-x-2"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#111] p-8 border border-[#222] rounded-2xl">
              <FiMessageSquare className="w-8 h-8 text-text-secondary mb-4" />
              <p className="text-text-tertiary text-sm mb-1">Total Messages</p>
              <p className="text-5xl font-display font-bold text-text-primary">
                {stats.messages}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#111] p-8 border border-[#222] rounded-2xl">
              <FiBriefcase className="w-8 h-8 text-text-secondary mb-4" />
              <p className="text-text-tertiary text-sm mb-1">
                Project Requests
              </p>
              <p className="text-5xl font-display font-bold text-text-primary">
                {stats.projects}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-[#222]">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === "messages"
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            Messages
            {activeTab === "messages" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 text-sm font-medium transition-all relative ${
              activeTab === "projects"
                ? "text-text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            Project Requests
            {activeTab === "projects" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-primary"
              />
            )}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "messages" ? (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-display font-semibold mb-6 flex items-center">
                <FiMail className="mr-3 text-text-secondary" />
                Recent Messages
              </h2>

              {messages.length === 0 ? (
                <div className="text-center py-12 bg-[#111] border border-[#222] rounded-xl">
                  <p className="text-text-tertiary">No messages yet</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-[#111] border border-[#222] rounded-xl hover:border-[#333] transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-display font-semibold text-text-primary">
                              {message.name}
                            </h3>
                            <span className="text-text-tertiary text-sm">
                              — {message.email}
                            </span>
                          </div>
                          <p className="text-text-secondary mb-3">
                            {message.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                            <span className="flex items-center">
                              <FiCalendar className="mr-1 w-3 h-3" />
                              {formatDate(message.createdAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => viewDetails(message)}
                            className="p-2 bg-[#1A1A1A] rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#222] transition-all"
                          >
                            <FiEye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setDeleteConfirm({
                                id: message._id,
                                type: "message",
                              })
                            }
                            className="p-2 bg-[#1A1A1A] rounded-lg text-red-500 hover:text-red-400 hover:bg-[#222] transition-all"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-display font-semibold mb-6 flex items-center">
                <FiFileText className="mr-3 text-text-secondary" />
                Project Requests
              </h2>

              {projects.length === 0 ? (
                <div className="text-center py-12 bg-[#111] border border-[#222] rounded-xl">
                  <p className="text-text-tertiary">No project requests yet</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-[#111] border border-[#222] rounded-xl hover:border-[#333] transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-display font-semibold text-text-primary">
                              {project.name}
                            </h3>
                            {project.company && (
                              <span className="text-text-tertiary text-sm">
                                ({project.company})
                              </span>
                            )}
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-sm">
                              <FiDollarSign className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-primary">
                                {project.budget}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <FiClock className="w-4 h-4 text-text-secondary" />
                              <span className="text-text-tertiary">
                                {formatDate(project.createdAt)}
                              </span>
                            </div>
                          </div>

                          <p className="text-text-secondary text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => viewDetails(project)}
                            className="p-2 bg-[#1A1A1A] rounded-lg text-text-secondary hover:text-text-primary hover:bg-[#222] transition-all"
                          >
                            <FiEye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              setDeleteConfirm({
                                id: project._id,
                                type: "project",
                              })
                            }
                            className="p-2 bg-[#1A1A1A] rounded-lg text-red-500 hover:text-red-400 hover:bg-[#222] transition-all"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-[#222] rounded-2xl p-8 max-w-md w-full"
            >
              <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-text-primary text-center mb-2">
                Confirm Deletion
              </h3>
              <p className="text-text-tertiary text-center mb-6">
                Are you sure you want to delete this {deleteConfirm.type}? This
                action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 border border-[#222] text-text-secondary rounded-lg hover:bg-[#1A1A1A] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    deleteItem(deleteConfirm.id, deleteConfirm.type)
                  }
                  className="flex-1 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {viewModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-[#222] rounded-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-bold text-text-primary">
                  {selectedItem.name ? "Message Details" : "Project Details"}
                </h3>
                <button
                  onClick={() => setViewModal(false)}
                  className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-text-tertiary" />
                </button>
              </div>

              {selectedItem.name ? (
                // Message Details
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <p className="text-text-tertiary text-xs mb-1">Name</p>
                      <p className="text-text-primary">{selectedItem.name}</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <p className="text-text-tertiary text-xs mb-1">Email</p>
                      <p className="text-text-primary">{selectedItem.email}</p>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <p className="text-text-tertiary text-xs mb-2">Message</p>
                    <p className="text-text-primary leading-relaxed">
                      {selectedItem.message}
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <p className="text-text-tertiary text-xs mb-1">Sent On</p>
                    <p className="text-text-primary">
                      {formatDate(selectedItem.createdAt)}
                    </p>
                  </div>
                </div>
              ) : (
                // Project Details
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <p className="text-text-tertiary text-xs mb-1">Name</p>
                      <p className="text-text-primary">{selectedItem.name}</p>
                    </div>
                    {selectedItem.company && (
                      <div className="bg-[#1A1A1A] p-4 rounded-lg">
                        <p className="text-text-tertiary text-xs mb-1">
                          Company
                        </p>
                        <p className="text-text-primary">
                          {selectedItem.company}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <p className="text-text-tertiary text-xs mb-1">Budget</p>
                    <p className="text-text-primary text-lg font-semibold">
                      {selectedItem.budget}
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <p className="text-text-tertiary text-xs mb-2">
                      Project Description
                    </p>
                    <p className="text-text-primary leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <p className="text-text-tertiary text-xs mb-1">
                      Submitted On
                    </p>
                    <p className="text-text-primary">
                      {formatDate(selectedItem.createdAt)}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewModal(false)}
                  className="px-6 py-2 bg-text-primary text-background rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
