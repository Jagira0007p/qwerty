import { motion } from "framer-motion";
import AnimatedCard from "../components/AnimatedCard";
import { FiArrowRight } from "react-icons/fi";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications built with cutting-edge technology.",
      features: [
        "Custom Applications",
        "E-commerce",
        "PWAs",
        "API Development",
      ],
    },
    {
      title: "App Development",
      description:
        "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "Flutter",
      ],
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions designed specifically for your business processes.",
      features: [
        "Enterprise Software",
        "CRM Systems",
        "Automation",
        "Integration",
      ],
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and solutions for modern businesses.",
      features: ["Cloud Migration", "DevOps", "Infrastructure", "Security"],
    },
    {
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that users love to interact with.",
      features: ["User Research", "Wireframing", "Prototyping", "Testing"],
    },
    {
      title: "Digital Marketing",
      description:
        "Strategic marketing solutions to grow your online presence.",
      features: ["SEO", "Content Strategy", "Analytics", "Campaigns"],
    },
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "Understanding your requirements" },
    { step: "02", title: "Planning", desc: "Strategic architecture design" },
    { step: "03", title: "Development", desc: "Agile development process" },
    { step: "04", title: "Deployment", desc: "Launch and ongoing support" },
  ];

  return (
    <div className="pt-20 bg-background">
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="display-medium mb-6"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large max-w-2xl mx-auto"
          >
            Comprehensive technology solutions tailored to your business needs
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <h3 className="text-xl font-display font-semibold mb-3 text-text-primary">
                  {service.title}
                </h3>
                <p className="text-text-tertiary text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
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
                <div className="text-text-secondary text-sm inline-flex items-center gap-2">
                  Learn more <FiArrowRight className="text-xs" />
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-large text-center mb-16">
            Our <span className="gradient-text">Process</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-display font-bold text-text-tertiary mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-display font-semibold mb-2 text-text-primary">
                  {item.title}
                </h3>
                <p className="text-text-tertiary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
