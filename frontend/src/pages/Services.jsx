import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AnimatedCard from "../components/AnimatedCard";
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiPenTool,
  FiTrendingUp,
  FiServer,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineCube } from "react-icons/hi";
import { BsGrid3X3, BsGraphUp, BsRocket } from "react-icons/bs";

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });

  const services = [
    {
      icon: FiCode,
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications built with cutting-edge technology.",
      features: [
        "Custom Applications",
        "E-commerce",
        "PWAs",
        "API Development",
      ],
      stats: "50+ Projects",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: FiSmartphone,
      title: "App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
      ],
      stats: "30+ Apps",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: FiServer,
      title: "Custom Software",
      description:
        "Tailored software solutions designed specifically for your business processes.",
      features: [
        "Enterprise Software",
        "CRM Systems",
        "Automation",
        "Integration",
      ],
      stats: "25+ Solutions",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: FiCloud,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and solutions for modern businesses.",
      features: ["Cloud Migration", "DevOps", "Infrastructure", "Security"],
      stats: "99.9% Uptime",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: FiPenTool,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that users love to interact with.",
      features: ["User Research", "Wireframing", "Prototyping", "Testing"],
      stats: "45+ Designs",
      color: "from-yellow-500/20 to-amber-500/20",
    },
    {
      icon: FiTrendingUp,
      title: "Digital Marketing",
      description:
        "Strategic marketing solutions to grow your online presence.",
      features: ["SEO", "Content Strategy", "Analytics", "Campaigns"],
      stats: "200% ROI",
      color: "from-pink-500/20 to-rose-500/20",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      desc: "Understanding your requirements",
      icon: BsGraphUp,
    },
    {
      step: "02",
      title: "Planning",
      desc: "Strategic architecture design",
      icon: BsGrid3X3,
    },
    {
      step: "03",
      title: "Development",
      desc: "Agile development process",
      icon: FiCode,
    },
    {
      step: "04",
      title: "Deployment",
      desc: "Launch and ongoing support",
      icon: BsRocket,
    },
  ];

  const technologies = [
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "TensorFlow",
  ];

  return (
    <div className="relative overflow-hidden bg-background pt-20">
      {/* Interactive Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Animated Morphing Shapes */}
        <motion.svg
          className="absolute top-20 left-20 w-96 h-96 opacity-20"
          viewBox="0 0 200 200"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.path
            d="M100 20 L120 60 L160 70 L130 100 L140 140 L100 120 L60 140 L70 100 L40 70 L80 60 Z"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            animate={{
              d: [
                "M100 20 L120 60 L160 70 L130 100 L140 140 L100 120 L60 140 L70 100 L40 70 L80 60 Z",
                "M100 30 L130 50 L170 80 L140 110 L150 150 L100 130 L50 150 L60 110 L30 80 L70 50 Z",
                "M100 20 L120 60 L160 70 L130 100 L140 140 L100 120 L60 140 L70 100 L40 70 L80 60 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-text-tertiary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -50, 50, -50],
              x: [null, 50, -50, 50],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center px-4 overflow-hidden"
      >
        {/* Dynamic Gradient Background */}
        <motion.div className="absolute inset-0" style={{ y: smoothY }}>
          <motion.div
            className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-[#222] to-[#333] rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 70, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-l from-[#222] to-[#333] rounded-full filter blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -70, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/3 right-1/4"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HiOutlineCube className="w-20 h-20 text-text-tertiary/20" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BsGrid3X3 className="w-24 h-24 text-text-tertiary/20" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: smoothY, opacity }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] rounded-full bg-[#111]/50 backdrop-blur-sm mb-8"
            whileHover={{ scale: 1.05, borderColor: "#666" }}
          >
            <HiOutlineSparkles className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary text-sm tracking-wider">
              OUR SERVICES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: smoothY, opacity }}
            className="display-medium mb-6"
          >
            Our{" "}
            <span className="gradient-text relative">
              Services
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
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: smoothY, opacity }}
            className="body-large text-text-secondary max-w-2xl mx-auto"
          >
            Comprehensive technology solutions tailored to your business needs
          </motion.p>
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

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
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
                      className="relative overflow-hidden rounded-2xl p-8 border border-[#222] hover:border-[#333] transition-all bg-[#111]"
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
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-14 h-14 rounded-lg bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-text-primary">
                          <IconComponent className="w-7 h-7" />
                        </div>
                      </motion.div>

                      <h3 className="relative z-10 text-xl font-display font-semibold mb-3 text-text-primary">
                        {service.title}
                      </h3>

                      <p className="relative z-10 text-text-tertiary text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="relative z-10 space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-text-tertiary text-sm"
                          >
                            <span className="mr-2 text-text-secondary">—</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Stats & CTA */}
                      <div className="relative z-10 flex items-center justify-between">
                        <motion.div
                          className="flex items-center gap-2 text-sm bg-[#1A1A1A] px-3 py-1 rounded-full"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <span className="text-text-secondary">
                            {service.stats}
                          </span>
                        </motion.div>

                        <motion.div
                          className="text-text-secondary text-sm inline-flex items-center gap-2 group"
                          animate={{
                            x: hoveredIndex === index ? 5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Learn more
                          <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatedCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 border-t border-[#222] bg-[#111]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full">
              OUR PROCESS
            </span>
            <h2 className="heading-large mt-6">
              How We <span className="gradient-text">Work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="bg-[#111] p-8 rounded-2xl border border-[#222] hover:border-[#333] transition-all text-center">
                    {/* Step Number */}
                    <motion.div
                      className="text-5xl font-display font-bold text-[#333] mb-4"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {item.step}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 mx-auto mb-4 text-text-secondary"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-full h-full" />
                    </motion.div>

                    <h3 className="text-lg font-display font-semibold mb-2 text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-text-tertiary text-sm">{item.desc}</p>

                    {/* Progress Line */}
                    {index < process.length - 1 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#333]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-large">
              Technologies We <span className="gradient-text">Use</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-[#111] border border-[#222] rounded-full text-text-secondary hover:text-text-primary hover:border-[#333] transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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

            <div className="relative bg-[#111] p-12 rounded-2xl border border-[#222]">
              <h2 className="heading-large mb-6">
                Ready to Start Your
                <span className="gradient-text block mt-2">Project?</span>
              </h2>

              <p className="body-large mb-10 text-text-secondary">
                Let's turn your ideas into reality with our innovative solutions
              </p>

              <motion.a
                href="/project-request"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F5F5F5] to-[#CCCCCC] text-background text-sm font-medium tracking-wide rounded-lg group relative overflow-hidden"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
