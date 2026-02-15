import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Use environment variable for API URL
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="pt-20 bg-background">
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="inline-flex items-center text-text-tertiary text-sm tracking-widest mb-4">
                  <FiMail className="mr-2" /> CONTACT
                </span>
                <h1 className="display-medium mb-6">
                  Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="body-large text-text-secondary">
                  Have questions? We'd love to hear from you. Send us a message
                  and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                {/* Visit Us */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-surface/50 border border-border group hover:border-[#404040] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:bg-[#222222] transition-all">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Visit Us
                    </h3>
                    <p className="text-text-primary text-sm">
                      123 Tech Street, Digital City, DC 12345
                    </p>
                  </div>
                </motion.div>

                {/* Email Us */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-surface/50 border border-border group hover:border-[#404040] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:bg-[#222222] transition-all">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Email Us
                    </h3>
                    <p className="text-text-primary text-sm">info@qdts.tech</p>
                    <p className="text-text-tertiary text-xs mt-1">
                      support@qdts.tech
                    </p>
                  </div>
                </motion.div>

                {/* Call Us */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-surface/50 border border-border group hover:border-[#404040] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:bg-[#222222] transition-all">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Call Us
                    </h3>
                    <p className="text-text-primary text-sm">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-text-tertiary text-xs mt-1">
                      Mon-Fri, 9am-6pm
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links - Optional */}
              <div className="pt-6">
                <p className="text-text-tertiary text-sm mb-4">Follow us</p>
                <div className="flex space-x-4">
                  {["twitter", "github", "linkedin", "instagram"].map(
                    (social) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ y: -3 }}
                        className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-[#222222] transition-all"
                      >
                        <span className="sr-only">{social}</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </motion.a>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="minimal-card"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                  <FiSend className="w-5 h-5 text-text-secondary" />
                </div>
                <h2 className="text-xl font-display font-semibold text-text-primary">
                  Send Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="flex items-center text-text-tertiary text-sm mb-2">
                    <FiUser className="mr-2" /> Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg 
                               focus:border-[#404040] focus:outline-none transition-colors 
                               text-text-primary pl-10"
                      placeholder="John Doe"
                    />
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4" />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="flex items-center text-text-tertiary text-sm mb-2">
                    <FiMail className="mr-2" /> Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg 
                               focus:border-[#404040] focus:outline-none transition-colors 
                               text-text-primary pl-10"
                      placeholder="john@example.com"
                    />
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4" />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="flex items-center text-text-tertiary text-sm mb-2">
                    <FiMessageSquare className="mr-2" /> Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg 
                               focus:border-[#404040] focus:outline-none transition-colors 
                               text-text-primary pl-10 resize-none"
                      placeholder="Your message here..."
                    />
                    <FiMessageSquare className="absolute left-3 top-4 text-text-tertiary w-4 h-4" />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-text-primary text-background text-sm font-medium tracking-wide 
                           rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 
                           flex items-center justify-center space-x-2 group"
                >
                  {status === "sending" ? (
                    <>
                      <div className="loading-dots inline-flex">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    <p className="text-sm">Message sent successfully!</p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
                  >
                    <FiAlertCircle className="w-5 h-5" />
                    <p className="text-sm">
                      Failed to send message. Please try again.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
