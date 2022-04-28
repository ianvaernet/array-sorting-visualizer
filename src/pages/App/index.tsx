import { useState } from 'react';
import { ArrayBlock, Header, Title } from '../../components';
import { Block } from '../../types';
import './style.module.css';
import { motion } from 'framer-motion';

export const App = () => {
  const [array, setArray] = useState<Block[]>([]);
  const [animationDelay, setAnimationDelay] = useState(1);

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseInt(target.value);
    if (delayLevel > 1) setAnimationDelay(delayLevel);
  };

  return (
    <div className="app_container">
      <Title/>
      <Header
        array={array}
        setArray={setArray}
        animationDelay={animationDelay}
        handleAnimationDelayChange={handleAnimationDelayChange}
      />
      <main>
        <motion.div initial={{x:200}}>
          {array.map(({ key, number, x, y }) => (
            <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};
