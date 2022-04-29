import { useState } from 'react';
import { ArrayBlock, Header, Title } from '../../components';
import { Block } from '../../types';
import style from './style.module.css';

export const App = () => {
  const [array, setArray] = useState<Block[]>([]);
  const [animationDelay, setAnimationDelay] = useState(10);

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseFloat(target.value);
    setAnimationDelay(delayLevel);
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
          {array.map(({ key, number, x, y, classNames }) => (
            <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} classNames={classNames} />
          ))}
        </div>
      </main>
    </div>
  );
};
