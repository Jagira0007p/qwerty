import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ProjectRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    budget: "",
    description: "",
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
      await axios.post("http://localhost:5000/api/project-request", formData);
      setStatus("success");
      setFormData({ name: "", company: "", budget: "", description: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="pt-20 bg-background">
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-text-tertiary text-sm tracking-widest">
              PROJECT
            </span>
            <h1 className="display-medium mt-4 mb-6">
              Start Your <span className="gradient-text">Project</span>
            </h1>
            <p className="body-large">
              Tell us about your project and we'll get back to you with a
              proposal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="minimal-card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-text-tertiary text-sm mb-2">
                  Your Name *
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
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                           focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div>
                <label className="block text-text-tertiary text-sm mb-2">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                           focus:border-[#404040] focus:outline-none transition-colors text-text-primary"
                >
                  <option value="" className="bg-background">
                    Select budget range
                  </option>
                  <option value="$5,000 - $10,000" className="bg-background">
                    $5,000 - $10,000
                  </option>
                  <option value="$10,000 - $25,000" className="bg-background">
                    $10,000 - $25,000
                  </option>
                  <option value="$25,000 - $50,000" className="bg-background">
                    $25,000 - $50,000
                  </option>
                  <option value="$50,000+" className="bg-background">
                    $50,000+
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-text-tertiary text-sm mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 bg-background border border-[#222222] rounded-lg 
                           focus:border-[#404040] focus:outline-none transition-colors text-text-primary placeholder-text-tertiary/50"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-text-primary text-background text-sm font-medium tracking-wide 
                         hover:bg-opacity-90 transition-all disabled:opacity-50"
              >
                {status === "sending"
                  ? "Submitting..."
                  : "Submit Project Request"}
              </button>

              {status === "success" && (
                <p className="text-text-tertiary text-sm text-center">
                  Project request submitted successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-text-tertiary text-sm text-center">
                  Failed to submit request. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectRequest;
