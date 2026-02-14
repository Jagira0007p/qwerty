import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const timelineRef = useRef([]);
  const missionRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });

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
      year: "2020",
      event: "Company founded with vision to transform tech solutions",
      icon: Rocket,
    },
    {
      year: "2021",
      event: "First 50 clients served successfully",
      icon: Target,
    },
    {
      year: "2022",
      event: "Expanded to international markets",
      icon: Globe,
    },
    {
      year: "2023",
      event: "Launched innovative custom software division",
      icon: Lightbulb,
    },
    {
      year: "2024",
      event: "Named Top Tech Solution Provider",
      icon: Trophy,
    },
  ];

  const values = [
    {
      title: "Innovation",
      desc: "Pushing boundaries and exploring new possibilities",
      icon: Lightbulb,
    },
    {
      title: "Excellence",
      desc: "Delivering nothing less than the best",
      icon: Sparkles,
    },
    {
      title: "Collaboration",
      desc: "Working together to achieve great things",
      icon: Users,
    },
  ];

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="parallax-layer absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl" />
          <div className="parallax-layer absolute bottom-20 right-10 w-96 h-96 bg-cool-blue/5 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Crafting Digital
            <span className="gradient-text block mt-2">
              Excellence Since 2020
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-text-dark max-w-2xl"
          >
            We're not just developers; we're digital architects building the
            future of technology, one innovation at a time.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-futuristic text-sm tracking-widest">
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Empowering
                <span className="gradient-text block mt-2">
                  Digital Innovation
                </span>
              </h2>
              <p className="text-text-dark text-lg leading-relaxed">
                To empower businesses through innovative technology solutions
                that drive growth, efficiency, and digital transformation. We
                believe in creating technology that doesn't just work—it excels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-cool-blue/20 rounded-3xl filter blur-2xl" />
              <div className="relative bg-secondary/50 backdrop-blur-sm p-8 rounded-3xl border border-accent/10">
                <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_pwohahvd.json"
                  style={{ height: "200px", width: "100%" }}
                />
                <p className="text-lg italic text-text-dark mt-4">
                  "Technology is best when it brings people together and solves
                  real-world problems."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our <span className="gradient-text">Journey</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full 
                          bg-gradient-to-b from-accent/50 via-accent to-cool-blue/50"
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
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="bg-secondary/80 backdrop-blur-sm p-8 rounded-2xl 
                                   border border-accent/10 hover:border-accent/30 
                                   transition-all duration-300 relative overflow-hidden cursor-pointer"
                        style={{ transformOrigin: "center center" }}
                      >
                        {/* Animated Background */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-cool-blue/5 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        <div className="relative">
                          <span className="text-3xl font-bold gradient-text mb-2 block">
                            {item.year}
                          </span>
                          <div
                            className="mb-3 transform group-hover:scale-110 
                                        group-hover:rotate-6 transition-all duration-300 inline-block"
                          >
                            <IconComponent size={40} className="text-accent" />
                          </div>
                          <p className="text-text-dark text-lg">{item.event}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Timeline Dot */}
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 
                                  w-6 h-6 bg-gradient-to-r from-accent to-cool-blue 
                                  rounded-full border-4 border-primary shadow-lg 
                                  shadow-accent/30 group-hover:scale-150 
                                  transition-all duration-300"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-text-dark text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div
                    className="mb-4 transform group-hover:scale-110 
                                group-hover:rotate-12 transition-all duration-300 inline-block"
                  >
                    <IconComponent
                      size={64}
                      className="text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-accent">
                    {value.title}
                  </h3>
                  <p className="text-text-dark">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
