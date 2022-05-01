import { useState } from 'react';
import { binarySort, bubbleSort, insertionSort, mergeSort, selectionSort } from '../../algorithms';
import { ArrayBlock, Header, Title } from '../../components';
import { generateBlocksArray, useAnimatedSplit, useFocus, useMove } from '../../functions';
import { createHiddenBlocks } from '../../functions/split';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';

const algorithms = {
  [SortingAlgorithms.BubbleSort]: bubbleSort,
  [SortingAlgorithms.BinaryInsertionSort]: binarySort,
  [SortingAlgorithms.InsertionSort]: insertionSort,
  [SortingAlgorithms.SelectionSort]: selectionSort,
  [SortingAlgorithms.MergeSort]: mergeSort,
};

const multilevelAlgorithms = [SortingAlgorithms.MergeSort];

export const App = () => {
  const [array, setArray] = useState<Block[]>([]);
  const [splittedArrayLevels, setSplittedArrayLevels] = useState<Block[][][]>([]);
  const [arrayLength, setArrayLength] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(10);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isResetNeeded, setResetNeeded] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithms>(SortingAlgorithms.BubbleSort);

  const move = useMove(array, setArray, animationDelay);
  const focus = useFocus(array, setArray, animationDelay);
  const animatedSplit = useAnimatedSplit(array, setSplittedArrayLevels, animationDelay);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    if (length > 0) {
      setArrayLength(length);
      setArray(generateBlocksArray({ length }));
      setSplittedArrayLevels([]);
    }
    setResetNeeded(false);
  };

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseFloat(target.value);
    setAnimationDelay(delayLevel);
  };

  const reset = () => {
    setArray(generateBlocksArray({ length: arrayLength }));
    setSplittedArrayLevels([]);
    setResetNeeded(false);
  };

  const sortArray = () => {
    setAnimationRunning(true);
    setResetNeeded(true);
    if (multilevelAlgorithms.includes(selectedAlgorithm)) {
      createHiddenBlocks(array, setArray, setSplittedArrayLevels);
    }
    algorithms[selectedAlgorithm](array, move, focus, animatedSplit, setSplittedArrayLevels).then(() => {
      setAnimationRunning(false);
    });
  };

  return (
    <div className={style.appContainer}>
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
        <div className={style.arrayContainer}>
          <div className={style.flexContainer}>
            {array.map(({ key, number, x, y, classNames }) => (
              <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} classNames={classNames} />
            ))}
          </div>
        </div>
        {splittedArrayLevels.map((level, index) => (
          <div key={'level' + index} className={style.splittedArrayLevelContainer}>
            <div className={style.flexContainer}>
              {level.map((splittedArrays, index) => (
                <div key={'splittedArray' + index} className={style.splittedArraysContainer}>
                  {splittedArrays.map(({ key, number, x, y, classNames }) => (
                    <ArrayBlock key={key} number={number} x={x} y={y} animationDelay={animationDelay} classNames={classNames} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
