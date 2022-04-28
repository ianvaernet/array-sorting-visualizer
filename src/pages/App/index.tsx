import { useState } from 'react';
import { ArrayBlock, Header, Title } from '../../components';
import { Block } from '../../types';
import style from './style.module.css';

export const App = () => {
  const [array, setArray] = useState<Block[]>([]);
  const [animationDelay, setAnimationDelay] = useState(1);

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseInt(target.value);
    if (delayLevel > 1) setAnimationDelay(delayLevel);
  };

  return (
    <div className={style.app_container}>
      <Title />
      <Header
        array={array}
        setArray={setArray}
        animationDelay={animationDelay}
        handleAnimationDelayChange={handleAnimationDelayChange}
      />
      <main>
        <div className={style.array_container}>
          {array.map(({ key, number, x, y }) => (
            <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} />
          ))}
        </div>
      </main>
    </div>
  );
};
