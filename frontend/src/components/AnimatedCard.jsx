import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.9, 0.3, 1] }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: [0.2, 0.9, 0.3, 1] },
      }}
      className="bg-[#111111] rounded-2xl p-8 border border-[#222222] 
                 hover:border-[#333333] transition-colors duration-500 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
