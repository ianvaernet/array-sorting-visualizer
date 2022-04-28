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
        x: 650,
        scale: 1,
        opacity: 1,
        transition: {
          delay: 0.4,
        },
      },
    }}
  >
    <h1 className='title'>Array sorting visualizer</h1>
  </motion.div>
);
