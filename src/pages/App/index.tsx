import { useState } from 'react';
import { binarySort, bubbleSort, insertionSort, mergeSort, selectionSort } from '../../algorithms';
import { shellSort } from '../../algorithms/shellSort';
import { ArrayBlock, Header } from '../../components';
import { createHiddenBlocks, generateBlocksArray, useFocus, useMove, useSplitAndMergeAnimations } from '../../functions';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';

const algorithms = {
  [SortingAlgorithms.BubbleSort]: bubbleSort,
  [SortingAlgorithms.BinaryInsertionSort]: binarySort,
  [SortingAlgorithms.InsertionSort]: insertionSort,
  [SortingAlgorithms.SelectionSort]: selectionSort,
  [SortingAlgorithms.MergeSort]: mergeSort,
  [SortingAlgorithms.ShellSort]: shellSort,
};

const multilevelAlgorithms = [SortingAlgorithms.MergeSort];

export const App = () => {
  const [blocksArray, setBlocksArray] = useState<Block[]>([]);
  const [splittedArrayLevels, setSplittedArrayLevels] = useState<Block[][][]>([]);
  const [arrayLength, setArrayLength] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(10);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [isResetNeeded, setResetNeeded] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithms>(SortingAlgorithms.BubbleSort);

  const move = useMove(blocksArray, setBlocksArray, animationDelay);
  const focus = useFocus(blocksArray, setBlocksArray, animationDelay);
  const splitAndMerge = useSplitAndMergeAnimations(setSplittedArrayLevels, animationDelay);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    if (length > 0) {
      setArrayLength(length);
      setBlocksArray(generateBlocksArray({ length }));
      setSplittedArrayLevels([]);
    }
    setResetNeeded(false);
  };

  const handleAnimationDelayChange = ({ target }: { target: HTMLInputElement }) => {
    const delayLevel = parseFloat(target.value);
    setAnimationDelay(delayLevel);
  };

  const reset = () => {
    setBlocksArray(generateBlocksArray({ length: arrayLength }));
    setSplittedArrayLevels([]);
    setResetNeeded(false);
  };

  const sortArray = () => {
    setAnimationRunning(true);
    setResetNeeded(true);
    if (multilevelAlgorithms.includes(selectedAlgorithm)) {
      createHiddenBlocks(blocksArray, setBlocksArray, setSplittedArrayLevels);
    }
    algorithms[selectedAlgorithm](blocksArray, move, focus, splitAndMerge).then(() => {
      setAnimationRunning(false);
    });
  };

  return (
    <div className={style.appContainer}>
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
            {blocksArray.map(({ key, number, x, y, classNames }) => (
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
