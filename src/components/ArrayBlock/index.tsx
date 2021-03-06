import React from 'react';
import style from './style.module.css';
import { motion } from 'framer-motion';

type Props = {
  number: number;
  x: number;
  y: number;
  animationDelay: number;
  classNames?: string[];
};

export const ArrayBlock: React.FC<Props> = ({ number, x, y, animationDelay, classNames = [] }: Props) => {
  return (
    <motion.div
      className={[style.container, ...classNames].join(' ')}
      initial={{ x: 100, y: 60 }}
      animate={{ x, y }}
      transition={{ delay: animationDelay / 100 }}
    >
      <p>{number}</p>
    </motion.div>
  );
};
