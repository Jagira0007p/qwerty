import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typed from "typed.js";
import Splitting from "splitting";
import AnimatedCard from "../components/AnimatedCard";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const heroRef = useRef(null);
  const typedRef = useRef(null);
  const splitRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Digital Solutions",
        "Web Experiences",
        "Mobile Apps",
        "Cloud Innovation",
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    if (splitRef.current) {
      Splitting({ target: splitRef.current });
    }

    return () => typed.destroy();
  }, []);

  const services = [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites built with cutting-edge technology",
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      title: "Custom Software",
      description: "Tailored solutions for your unique business needs",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure for modern businesses",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces users love",
    },
    {
      title: "Digital Marketing",
      description: "Strategic marketing to grow your online presence",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Minimal Background */}
        <div className="absolute inset-0">
          <div className="absolute top-40 left-20 w-96 h-96 bg-[#111111] rounded-full filter blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#111111] rounded-full filter blur-3xl" />
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          style={{ y, opacity }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-text-tertiary text-sm tracking-widest mb-6"
          >
            QDTS — SINCE 2020
          </motion.span>

          <h1 ref={splitRef} className="display-medium mb-8" data-splitting>
            Transform Your
            <span className="gradient-text block mt-2">Digital Vision</span>
          </h1>

          <div className="body-large mb-10 h-16">
            <span>We create </span>
            <span ref={typedRef} className="text-text-primary font-medium" />
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href="/contact"
              className="group relative px-8 py-4 bg-text-primary text-background text-sm font-medium tracking-wide overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="/project-request"
              className="px-8 py-4 border border-[#222222] text-text-primary text-sm font-medium tracking-wide hover:bg-[#111111] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Project
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 border border-[#222222] rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-text-tertiary rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-text-tertiary text-sm tracking-widest">
              SERVICES
            </span>
            <h2 className="heading-large mt-4">
              What We <span className="gradient-text">Do</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <h3 className="text-xl font-display font-semibold mb-3 text-text-primary">
                  {service.title}
                </h3>
                <p className="text-text-tertiary text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6">
                  <span className="text-text-secondary text-sm group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                    Learn more <FiArrowRight className="text-xs" />
                  </span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects" },
              { number: "30+", label: "Clients" },
              { number: "5+", label: "Years" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="display-medium text-text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-text-tertiary text-sm tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="heading-large mb-6"
          >
            Ready to Start Your
            <span className="gradient-text block mt-2">Digital Journey?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="body-large mb-10"
          >
            Let's turn your ideas into reality
          </motion.p>

          <motion.a
            href="/project-request"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-text-primary text-background text-sm font-medium tracking-wide group"
          >
            Start Your Project
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Home;
