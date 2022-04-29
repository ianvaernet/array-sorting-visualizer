import React from 'react';
import style from './style.module.css';
import { motion } from 'framer-motion';

type Props = {
  number: number;
  x: number;
  y: number;
  animationDelay: number;
};

export const ArrayBlock: React.FC<Props> = ({ number, x, y, animationDelay }: Props) => {
  return (
    <motion.div className={style.container} initial={{x: 200, y:60}} animate={{ x, y }} transition={{ delay: animationDelay / 100 }}>
      <p>{number}</p>
    </motion.div>
  );
};
