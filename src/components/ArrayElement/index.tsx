import React from 'react';
import style from './style.module.css';
import { motion } from 'framer-motion';

type Props = {
  number: number;
  x: number;
  y: number;
};

export const ArrayElement: React.FC<Props> = ({ number, x, y }: Props) => {
  return (
    <motion.div className={style.container} animate={{ x, y }} transition={{ delay: 0.05 }}>
      <p>{number}</p>
    </motion.div>
  );
};