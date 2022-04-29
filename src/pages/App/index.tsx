import { useState } from 'react';
import { binarySort, bubbleSort, insertionSort, selectionSort } from '../../algorithms';
import { ArrayBlock, Header, Title } from '../../components';
import { generateBlocksArray, useFocus, useMove } from '../../functions';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';

const algorithms = {
  [SortingAlgorithms.BubbleSort]: bubbleSort,
  [SortingAlgorithms.BinaryInsertionSort]: binarySort,
  [SortingAlgorithms.InsertionSort]: insertionSort,
  [SortingAlgorithms.SelectionSort]: selectionSort,
};

export const App = () => {
  const [array, setArray] = useState<Block[]>([]);
  const [splittedArrays, setSplittedArrays] = useState<Block[][]>([]);
  const [arrayLength, setArrayLength] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(10);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isResetNeeded, setResetNeeded] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithms>(SortingAlgorithms.BubbleSort);

  const move = useMove(array, setArray, animationDelay);
  const focus = useFocus(array, setArray, animationDelay);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    if (length > 0) {
      setArrayLength(length);
      setArray(generateBlocksArray({ length }));
    }
    setResetNeeded(false);
  };

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseFloat(target.value);
    setAnimationDelay(delayLevel);
  };

  const reset = () => {
    setArray(generateBlocksArray({ length: arrayLength }));
    setResetNeeded(false);
  };

  const sortArray = () => {
    setAnimationRunning(true);
    setResetNeeded(true);
    algorithms[selectedAlgorithm](array, move, focus).then(() => setAnimationRunning(false));
  };

  return (
    <div className={style.app_container}>
      <Title />
      <Header
        arrayLength={arrayLength}
        handleArrayLengthChange={handleArrayLengthChange}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        animationDelay={animationDelay}
        handleAnimationDelayChange={handleAnimationDelayChange}
        handleButtonClick={isResetNeeded ? reset : sortArray}
        buttonText={isResetNeeded ? 'Reset' : 'Play'}
        isAnimationRunning={isAnimationRunning}
      />
      <main>
        <div className={style.array_container}>
          {array.map(({ key, number, x, y, classNames }) => (
            <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} classNames={classNames} />
          ))}
        </div>
        {splittedArrays.map((splittedArray) => (
          <div className={style.array_container}>
            {splittedArray.map(({ key, number, x, y, classNames }) => (
              <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} classNames={classNames} />
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};
