import { motion } from "framer-motion"

export const Test = () => (
    <motion.div initial="hidden" animate="visible" variants={{
        hidden: {
          scale: .8,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: .4
          }
        }
      }}>
        <h1 className='title'>This is the title</h1>
      </motion.div>
)