import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import Typed from "typed.js";
import Splitting from "splitting";
import AnimatedCard from "../components/AnimatedCard";
import {
  FiArrowRight,
  FiArrowDown,
  FiPlay,
  FiPause,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiGlobe,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiUsers,
  FiAward,
  FiBriefcase,
  FiVideo,
} from "react-icons/fi";
import {
  HiOutlineSparkles,
  HiOutlineCube,
  HiOutlineChip,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { BsGrid3X3, BsGraphUp, BsRocket } from "react-icons/bs";

const Home = () => {
  const heroRef = useRef(null);
  const typedRef = useRef(null);
  const splitRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Digital Solutions",
        "Web Experiences",
        "Mobile Apps",
        "Cloud Innovation",
        "AI Integration",
        "Digital Transformation",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "▌",
    });

    if (splitRef.current) {
      Splitting({ target: splitRef.current });
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      typed.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Morphing shapes animation
  useEffect(() => {
    const morphInterval = setInterval(() => {
      controls.start({
        pathLength: [0.5, 1, 0.5],
        scale: [1, 1.2, 1],
        rotate: [0, 90, 180, 270, 360],
        transition: { duration: 8, ease: "easeInOut", repeat: Infinity },
      });
    }, 8000);

    return () => clearInterval(morphInterval);
  }, [controls]);

  const services = [
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Web Development",
      description:
        "Modern, responsive websites built with cutting-edge technology",
      color: "from-blue-500/20 to-purple-500/20",
      stats: "50+ Projects",
    },
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      title: "App Development",
      description: "Native and cross-platform mobile applications",
      color: "from-green-500/20 to-emerald-500/20",
      stats: "30+ Apps",
    },
    {
      icon: <FiVideo className="w-6 h-6" />,
      title: "Video Editing",
      description:
        "Professional video editing and post-production services for stunning visual content",
      color: "from-orange-500/20 to-red-500/20",
      stats: "500+ Videos",
    },
    {
      icon: <HiOutlineChip className="w-6 h-6" />,
      title: "AI Integration",
      description: "Intelligent solutions powered by machine learning",
      color: "from-purple-500/20 to-pink-500/20",
      stats: "15+ AI Models",
    },
    {
      icon: <BsGraphUp className="w-6 h-6" />,
      title: "Digital Marketing",
      description: "Strategic marketing to grow your online presence",
      color: "from-yellow-500/20 to-orange-500/20",
      stats: "200% ROI",
    },
    {
      icon: <HiOutlineLightBulb className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces users love",
      color: "from-pink-500/20 to-rose-500/20",
      stats: "45+ Designs",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects", icon: <FiBriefcase /> },
    { number: "30+", label: "Clients", icon: <FiUsers /> },
    { number: "5+", label: "Years", icon: <FiAward /> },
    { number: "24/7", label: "Support", icon: <FiShield /> },
  ];

  const features = [
    {
      title: "Innovation First",
      description: "Cutting-edge solutions for modern challenges",
      icon: <HiOutlineSparkles />,
    },
    {
      title: "Scalable Solutions",
      description: "Grow your business with flexible architecture",
      icon: <BsGraphUp />,
    },
    {
      title: "Fast Delivery",
      description: "Quick turnaround without compromising quality",
      icon: <BsRocket />,
    },
  ];

  return (
    <div className="relative overflow-hidden bg-background">
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

        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          style={{
            y: smoothY,
            opacity,
            scale: smoothScale,
            rotateX: rotateX,
            perspective: 1000,
          }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] rounded-full bg-[#111]/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "#666" }}
            >
              <HiOutlineSparkles className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm tracking-wider">
                QwertyInfosys — SINCE 2022
              </span>
            </motion.div>
          </motion.div>

          <h1 ref={splitRef} className="display-medium mb-8" data-splitting>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block"
            >
              Transform Your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="gradient-text block mt-2 relative"
            >
              Digital Vision
              <motion.span
                className="absolute -top-4 -right-12 text-4xl"
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
            </motion.span>
          </h1>

          <motion.div
            className="body-large mb-10 h-16 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span>We create </span>
            <span
              ref={typedRef}
              className="text-text-primary font-medium min-w-[200px]"
            />

            {/* Audio Visualizer */}
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-4 p-2 border border-[#333] rounded-full hover:border-[#666] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <FiPause className="w-3 h-3" />
              ) : (
                <FiPlay className="w-3 h-3" />
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.a
              href="/contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-[#F5F5F5] to-[#CCCCCC] text-background text-sm font-medium tracking-wide overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#CCCCCC] to-[#F5F5F5]"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="/project-request"
              className="group relative px-10 py-5 border border-[#333] text-text-primary text-sm font-medium tracking-wide overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-[#111]"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Project
                <FiArrowDown className="group-hover:translate-y-1 transition-transform" />
              </span>
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          {/* <motion.div
            className="mt-16 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#333] to-[#444] border-2 border-background"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-2 text-text-secondary text-sm">
                4.9 (250+ reviews)
              </span>
            </div>
          </motion.div> */}
        </motion.div>

        {/* Interactive Scroll Indicator */}
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
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-text-tertiary rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full"
              whileHover={{ scale: 1.05, borderColor: "#666" }}
            >
              SERVICES
            </motion.span>
            <h2 className="heading-large mt-6">
              What We{" "}
              <span className="gradient-text relative">
                Do
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-text-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <AnimatedCard delay={index * 0.1}>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-8 border border-[#222] hover:border-[#333] transition-all"
                    whileHover={{ y: -5 }}
                  >
                    {/* Background Gradient */}
                    <motion.div
                      // className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0`}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="relative z-10 mb-6"
                      animate={{
                        rotate: hoveredIndex === index ? 360 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#333] flex items-center justify-center text-text-primary">
                        {service.icon}
                      </div>
                    </motion.div>

                    <h3 className="relative z-10 text-xl font-display font-semibold mb-3 text-text-primary">
                      {service.title}
                    </h3>

                    <p className="relative z-10 text-text-tertiary text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Stats */}
                    <motion.div
                      className="relative z-10 flex items-center gap-2 text-sm"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <FiTrendingUp className="w-4 h-4 text-text-secondary" />
                      <span className="text-text-secondary">
                        {service.stats}
                      </span>
                    </motion.div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-8 right-8 opacity-0"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiArrowRight className="w-5 h-5 text-text-primary" />
                    </motion.div>
                  </motion.div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 px-6 border-t border-[#222] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#222] to-transparent opacity-0 group-hover:opacity-100"
                  style={{ filter: "blur(20px)" }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl mb-2 text-text-secondary">
                    {stat.icon}
                  </div>
                  <motion.div
                    className="display-medium text-text-primary mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-text-tertiary text-sm tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  className="inline-block p-6 rounded-full bg-[#111] border border-[#222] mb-6 group-hover:border-[#333] transition-all"
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <div className="text-3xl text-text-secondary">
                    {feature.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-display font-semibold mb-3 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-tertiary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax */}
      <section className="py-32 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23222' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="heading-large mb-6"
          >
            Ready to Start Your
            <span className="gradient-text block mt-2 relative">
              Digital Journey?
              <motion.span
                className="absolute -top-4 -right-12 text-4xl"
                animate={{
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="body-large mb-12"
          >
            Let's turn your ideas into reality with our innovative solutions
          </motion.p>

          <motion.a
            href="/project-request"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-[#F5F5F5] to-[#CCCCCC] text-background text-sm font-medium tracking-wide overflow-hidden rounded-lg"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-[#CCCCCC] to-[#F5F5F5]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Start Your Project
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Home;
