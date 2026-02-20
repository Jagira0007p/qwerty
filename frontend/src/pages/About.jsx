import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Rocket,
  Target,
  Globe,
  Lightbulb,
  Trophy,
  Sparkles,
  Users,
  Award,
  Heart,
  Zap,
  Compass,
  Clock,
  Shield,
} from "lucide-react";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineCube } from "react-icons/hi";
import { BsGrid3X3 } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timelineRef = useRef([]);
  const missionRef = useRef(null);
  const heroRef = useRef(null);
  const controlsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });

  useEffect(() => {
    // Parallax effect with GSAP
    gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
      gsap.to(layer, {
        y: i % 2 === 0 ? 150 : -150,
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    });

    // Timeline staggered animations
    timelineRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotationY: index % 2 === 0 ? -30 : 30,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const milestones = [
    {
      year: "2022",
      event: "Company founded with vision to transform tech solutions",
      icon: Rocket,
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      year: "2023",
      event: "First 50 clients served successfully",
      icon: Target,
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      year: "2024",
      event: "Expanded to international markets",
      icon: Globe,
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      year: "2025",
      event: "Launched innovative custom software division",
      icon: Lightbulb,
      color: "from-yellow-500/20 to-amber-500/20",
    },
    {
      year: "2026",
      event: "Named Top Tech Solution Provider",
      icon: Trophy,
      color: "from-purple-500/20 to-pink-500/20",
    },
  ];

  const values = [
    {
      title: "Innovation",
      desc: "Pushing boundaries and exploring new possibilities",
      icon: Lightbulb,
      stats: "50+ Innovations",
    },
    {
      title: "Excellence",
      desc: "Delivering nothing less than the best",
      icon: Award,
      stats: "99% Satisfaction",
    },
    {
      title: "Collaboration",
      desc: "Working together to achieve great things",
      icon: Users,
      stats: "30+ Partners",
    },
    {
      title: "Integrity",
      desc: "Honest and transparent in everything we do",
      icon: Heart,
      stats: "100% Trust",
    },
    {
      title: "Speed",
      desc: "Fast delivery without compromising quality",
      icon: Zap,
      stats: "2x Faster",
    },
    {
      title: "Reliability",
      desc: "Dependable solutions you can count on",
      icon: Shield,
      stats: "99.9% Uptime",
    },
  ];

  const team = [
    { name: "Gautam Chauhan", role: "Founder & CEO", years: "5+ years" },
    { name: "Prince Vadadoriya", role: "Web Developer", years: "2+ years" },
    { name: "Rohan   Dabhi", role: "App Developer", years: "3+ years" },
    // { name: "Emily Davis", role: "Project Manager", years: "5+ years" },
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
        className="relative min-h-[80vh] flex items-center px-4 overflow-hidden"
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

        {/* 3D Cube */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 25,
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
                className="absolute inset-0 border border-[#333] bg-[#111]/30 backdrop-blur-sm"
                style={{
                  transform: `rotate${i < 2 ? "Y" : "X"}(${i * 90}deg) translateZ(64px)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-1/3 left-1/4"
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
          className="absolute top-1/3 left-1/3"
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

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div style={{ y: smoothY, opacity, scale: smoothScale }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] rounded-full bg-[#111]/50 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05, borderColor: "#666" }}
            >
              <HiOutlineSparkles className="w-4 h-4 text-text-secondary" />
              <span className="text-text-secondary text-sm tracking-wider">
                ABOUT QwertyInfosys
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-display font-bold mb-6"
            >
              Crafting Digital
              <span className="gradient-text block mt-2 relative">
                Excellence Since 2022
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
              className="text-xl text-text-secondary max-w-2xl leading-relaxed"
            >
              We're not just developers; we're digital architects building the
              future of technology, one innovation at a time.
            </motion.p>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-8 mt-12"
            >
              <div>
                <div className="text-3xl font-display font-bold text-text-primary">
                  50+
                </div>
                <div className="text-text-tertiary text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-text-primary">
                  30+
                </div>
                <div className="text-text-tertiary text-sm">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-text-primary">
                  5+
                </div>
                <div className="text-text-tertiary text-sm">Years</div>
              </div>
            </motion.div>
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

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full mb-6">
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
                Empowering
                <span className="gradient-text block mt-2">
                  Digital Innovation
                </span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                To empower businesses through innovative technology solutions
                that drive growth, efficiency, and digital transformation. We
                believe in creating technology that doesn't just work—it excels.
              </p>

              {/* Key Points */}
              <div className="space-y-4">
                {[
                  "Customer-centric approach",
                  "Innovation-driven culture",
                  "Quality-first mindset",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-text-primary" />
                    <span className="text-text-secondary">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#333] to-[#222] rounded-3xl filter blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-[#111]/80 backdrop-blur-sm p-8 rounded-3xl border border-[#222]">
                <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_pwohahvd.json"
                  style={{ height: "200px", width: "100%" }}
                />
                <p className="text-lg italic text-text-secondary mt-4">
                  "Technology is best when it brings people together and solves
                  real-world problems."
                </p>
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-yellow-500 fill-yellow-500 w-4 h-4"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-4 bg-[#111]/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full">
              OUR JOURNEY
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-6">
              The Path to <span className="gradient-text">Excellence</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line with Animation */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[#333] to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              style={{ originY: 0 }}
            />

            <div className="space-y-12">
              {milestones.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => (timelineRef.current[index] = el)}
                    className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} 
                               items-center group`}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#111]/80 backdrop-blur-sm p-8 rounded-2xl 
                                   border border-[#222] hover:border-[#333] 
                                   transition-all duration-300 relative overflow-hidden cursor-pointer"
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        {/* Animated Background Gradient */}
                        <motion.div
                          // className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0`}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="relative">
                          <span className="text-3xl font-display font-bold gradient-text mb-2 block">
                            {item.year}
                          </span>
                          <motion.div
                            className="mb-3 inline-block"
                            animate={{
                              rotate: hoveredIndex === index ? 360 : 0,
                              scale: hoveredIndex === index ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <IconComponent
                              size={40}
                              className="text-text-primary"
                              strokeWidth={1.5}
                            />
                          </motion.div>
                          <p className="text-text-secondary text-lg">
                            {item.event}
                          </p>
                        </div>

                        {/* Hover Arrow */}
                        <motion.div
                          className="absolute bottom-4 right-4 opacity-0"
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                            x: hoveredIndex === index ? 0 : 10,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiArrowRight className="w-5 h-5 text-text-primary" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Timeline Dot with Pulse */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2"
                      animate={{
                        scale: [1, 1.5, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(64,64,64,0.7)",
                          "0 0 0 10px rgba(64,64,64,0)",
                          "0 0 0 0 rgba(64,64,64,0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-4 h-4 bg-gradient-to-r from-[#404040] to-[#666] rounded-full border-2 border-[#111]" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full"
            >
              OUR VALUES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mt-6 mb-4"
            >
              What We <span className="gradient-text">Stand For</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text-secondary text-lg"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative"
                  onHoverStart={() => setHoveredIndex(`value-${index}`)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="bg-[#111] p-8 rounded-2xl border border-[#222] hover:border-[#333] transition-all duration-300 relative overflow-hidden">
                    {/* Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#333]/20 to-[#222]/20 opacity-0"
                      animate={{
                        opacity: hoveredIndex === `value-${index}` ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      className="relative z-10"
                      animate={{
                        rotate: hoveredIndex === `value-${index}` ? 360 : 0,
                      }}
                      transition={{ duration: 1 }}
                    >
                      <IconComponent
                        size={48}
                        className="text-text-primary mb-4"
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <h3 className="relative z-10 text-xl font-display font-semibold mb-2 text-text-primary">
                      {value.title}
                    </h3>
                    <p className="relative z-10 text-text-tertiary text-sm mb-4">
                      {value.desc}
                    </p>

                    {/* Stats */}
                    <motion.div
                      className="relative z-10 inline-flex items-center gap-2 text-sm bg-[#222] px-3 py-1 rounded-full"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-text-secondary">{value.stats}</span>
                    </motion.div>

                    {/* Decorative Corner
                    <motion.div
                      className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        rotate: [0, 90, 180],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#404040]" />
                    </motion.div> */}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 bg-[#111]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-text-tertiary text-sm tracking-widest inline-block px-4 py-2 border border-[#333] rounded-full"
            >
              OUR TEAM
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mt-6 mb-4"
            >
              Meet the <span className="gradient-text">Minds</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text-secondary text-lg"
            >
              The passionate people behind our success
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-[#333] transition-all duration-300 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#333] to-[#222] flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-text-secondary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-2">
                    {member.role}
                  </p>
                  <div className="inline-flex items-center gap-1 text-xs text-text-tertiary bg-[#222] px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    {member.years}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
