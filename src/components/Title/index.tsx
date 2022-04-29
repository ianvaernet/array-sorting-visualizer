import { motion } from 'framer-motion';

export const Title = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {
        scale: 0.8,
        opacity: 0,
      },
      visible: {
        x: 440,
        opacity: 1,
        transition: {
          delay: 0.4,
        },
      },
    }}
  >
   
  </motion.div>
);
