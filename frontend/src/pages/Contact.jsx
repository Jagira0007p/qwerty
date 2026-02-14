import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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
      await axios.post("http://localhost:5000/api/contact", formData);
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-text-tertiary text-sm tracking-widest">
                CONTACT
              </span>
              <h1 className="display-medium mt-4 mb-8">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="body-large mb-12">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-text-secondary">📍</span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Visit Us
                    </h3>
                    <p className="text-text-tertiary text-sm">
                      123 Tech Street, Digital City, DC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-text-secondary">✉️</span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Email Us
                    </h3>
                    <p className="text-text-tertiary text-sm">info@qdts.tech</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="text-text-secondary">📞</span>
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1 text-text-secondary">
                      Call Us
                    </h3>
                    <p className="text-text-tertiary text-sm">
                      +1 (555) 123-4567
                    </p>
                  </div>
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
              <h2 className="text-xl font-display font-semibold mb-8 text-text-primary">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-text-tertiary text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                             focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-tertiary text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                             focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-tertiary text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                             focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-text-primary text-background text-sm font-medium tracking-wide 
                           hover:bg-opacity-90 transition-all disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="text-text-tertiary text-sm text-center">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-text-tertiary text-sm text-center">
                    Failed to send message. Please try again.
                  </p>
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
