import React, { useState } from 'react';
import { insertionSort, selectionSort } from '../../algorithms';
import { binarySort } from '../../algorithms/binarySort';
import { BubbleSort } from '../../algorithms/BubbleSort';
import { Button, Input, LabeledInput, Select } from '../../components';
import { generateArrayOfRandomNumbers, useMove } from '../../functions';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';
import './title.css';

type Props = {
  array: Block[];
  setArray: React.Dispatch<React.SetStateAction<Block[]>>;
  animationDelay: number;
  handleAnimationDelayChange: ({ target }: { target: HTMLInputElement }) => void;
};

const algorithms = {
  [SortingAlgorithms.BubbleSort]: BubbleSort,
  [SortingAlgorithms.BinaryInsertionSort]: binarySort,
  [SortingAlgorithms.InsertionSort]: insertionSort,
  [SortingAlgorithms.SelectionSort]: selectionSort,
};

export const Header: React.FC<Props> = ({ array, setArray, animationDelay, handleAnimationDelayChange }: Props) => {
  const [arrayLength, setArrayLength] = useState<number>(0);
  const [isAnimationRunning, setAnimationRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithms>(SortingAlgorithms.BubbleSort);
  const move = useMove(array, setArray, animationDelay);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    if (length > 0) {
      setArrayLength(length);
      setArray(generateArrayOfRandomNumbers({ length }));
    }
  };

  const sortArray = () => {
    setAnimationRunning(true);
    algorithms[selectedAlgorithm](array, move).then(() => setAnimationRunning(false));
  };

  return (
    <header className={style.header}>
      <h1 className='title'><b>Array sorting visualizer</b></h1>
      <div className={style.inputContainer}>
        <LabeledInput label="Enter the array length:">
          <Input
            id="arrayLengthInput"
            type="number"
            value={arrayLength}
            onChange={handleArrayLengthChange}
            disabled={isAnimationRunning}
          />
        </LabeledInput>
      </div>
      <LabeledInput label="Select the sorting algorithm:">
        <Select
          id="sortingAlgorithmSelect"
          options={Object.values(SortingAlgorithms)}
          disabled={isAnimationRunning}
          value={selectedAlgorithm}
          onChange={({ target }) => setSelectedAlgorithm(target.value as SortingAlgorithms)}
        />
      </LabeledInput>
      <div className={style.inputContainer}>
        <LabeledInput label="Enter the animation delay level:">
          <Input
            id="arrayLengthInput"
            type="number"
            value={animationDelay}
            onChange={handleAnimationDelayChange}
            disabled={isAnimationRunning}
          />
        </LabeledInput>
      </div>
      <div className={style.inputContainer}>
        <Button onClick={sortArray} disabled={isAnimationRunning}>
          Play
        </Button>
      </div>
    </header>
  );
};
