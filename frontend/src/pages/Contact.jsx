import { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";
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
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineCube } from "react-icons/hi";
import { BsGrid3X3 } from "react-icons/bs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });

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

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: ["Omkar Chowk", "UNA City, GJ 362560"],
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: ["mrgdchauhan@gmail.com", "We reply within 24 hours"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: ["+91 9328043160", "Mon-Fri, 9am-5pm"],
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "#", label: "GitHub" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <div className="relative overflow-hidden bg-background pt-20">
      {/* Interactive Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Animated Morphing Shapes */}
        <motion.svg
          className="absolute top-20 right-20 w-96 h-96 opacity-20"
          viewBox="0 0 200 200"
          animate={controls}
        >
          <motion.path
            d="M100 20 L120 60 L160 70 L130 100 L140 140 L100 120 L60 140 L70 100 L40 70 L80 60 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0.5 }}
            animate={{ pathLength: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#404040" />
              <stop offset="50%" stopColor="#666666" />
              <stop offset="100%" stopColor="#999999" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-text-tertiary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 30, -30, 30],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Dynamic Gradient Background */}
        <motion.div className="absolute inset-0" style={{ y: smoothY }}>
          <motion.div
            className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#222] to-[#333] rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-l from-[#222] to-[#333] rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* 3D Cube */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ perspective: 1000 }}
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-[#333] bg-[#111]/50 backdrop-blur-sm"
                style={{
                  transform: `rotate${i < 2 ? "Y" : "X"}(${i * 90}deg) translateZ(64px)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/3 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HiOutlineCube className="w-16 h-16 text-text-tertiary/20" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/4"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BsGrid3X3 className="w-20 h-20 text-text-tertiary/20" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            style={{ y: smoothY, opacity, scale: smoothScale }}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] rounded-full bg-[#111]/50 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05, borderColor: "#666" }}
            >
              <HiOutlineSparkles className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm tracking-wider">
                CONTACT US
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight mb-6"
            >
              Get In{" "}
              <span className="gradient-text relative">
                Touch
                <motion.span
                  className="absolute -top-4 -right-12 text-4xl text-[#F5F5F5]"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="relative">
            <div className="w-6 h-10 border border-[#333] rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-text-tertiary rounded-full mt-2"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="relative group"
                    >
                      <div className="bg-[#111] p-6 rounded-xl border border-[#222] hover:border-[#333] transition-all duration-300 overflow-hidden">
                        {/* Background Gradient */}
                        <motion.div
                          // className={`absolute inset-0 bg-gradient-to-br ${info.color}`}
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="relative z-10 flex items-start space-x-4">
                          <motion.div
                            className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:bg-[#222] transition-all"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <h3 className="text-sm font-medium uppercase tracking-wider mb-2 text-text-secondary">
                              {info.title}
                            </h3>
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-text-primary text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <p className="text-text-tertiary text-sm mb-4">
                  Follow us on social media
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-[#222] transition-all border border-[#222] hover:border-[#333]"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Map/Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-[#111] p-6 rounded-xl border border-[#222]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-text-primary">
                      24/7
                    </div>
                    <div className="text-text-tertiary text-sm">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-text-primary">
                      &lt; 2h
                    </div>
                    <div className="text-text-tertiary text-sm">Response</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
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

              <div className="relative bg-[#111] p-8 rounded-2xl border border-[#222]">
                <div className="flex items-center space-x-3 mb-8">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FiSend className="w-5 h-5 text-text-secondary" />
                  </motion.div>
                  <h2 className="text-xl font-display font-semibold text-text-primary">
                    Send Message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="flex items-center text-text-tertiary text-sm mb-2">
                      <FiUser className="mr-2" /> Name
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-[#222] rounded-lg 
                                 focus:border-[#404040] focus:outline-none transition-colors 
                                 text-text-primary pl-10 group-hover:border-[#333]"
                        placeholder="John Doe"
                      />
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4 group-hover:text-text-secondary transition-colors" />

                      {/* Input Focus Effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#404040] to-[#666]"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="flex items-center text-text-tertiary text-sm mb-2">
                      <FiMail className="mr-2" /> Email
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-[#222] rounded-lg 
                                 focus:border-[#404040] focus:outline-none transition-colors 
                                 text-text-primary pl-10 group-hover:border-[#333]"
                        placeholder="john@example.com"
                      />
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4 group-hover:text-text-secondary transition-colors" />
                    </div>
                  </motion.div>

                  {/* Message Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="flex items-center text-text-tertiary text-sm mb-2">
                      <FiMessageSquare className="mr-2" /> Message
                    </label>
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-background border border-[#222] rounded-lg 
                                 focus:border-[#404040] focus:outline-none transition-colors 
                                 text-text-primary pl-10 resize-none group-hover:border-[#333]"
                        placeholder="Your message here..."
                      />
                      <FiMessageSquare className="absolute left-3 top-4 text-text-tertiary w-4 h-4 group-hover:text-text-secondary transition-colors" />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#F5F5F5] to-[#CCCCCC] text-background text-sm font-medium tracking-wide 
                               rounded-lg hover:from-[#CCCCCC] hover:to-[#F5F5F5] transition-all disabled:opacity-50 
                               flex items-center justify-center space-x-2 group relative overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-[#CCCCCC] to-[#F5F5F5]"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {status === "sending" ? (
                        <>
                          <div className="loading-dots inline-flex relative z-10">
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                          <span className="relative z-10">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message</span>
                          <FiSend className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20"
                    >
                      <FiCheckCircle className="w-5 h-5" />
                      <p className="text-sm">Message sent successfully!</p>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                      <FiAlertCircle className="w-5 h-5" />
                      <p className="text-sm">
                        Failed to send message. Please try again.
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
