import React, { useState } from 'react';
import { insertionSort } from '../../algorithms';
import { Button, Input, LabeledInput, Select } from '../../components';
import { generateArrayOfRandomNumbers } from '../../functions';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';

type Props = {
  array: Block[];
  setArray: React.Dispatch<React.SetStateAction<Block[]>>;
  animationDelay: number;
  handleAnimationDelayChange: ({ target }: { target: HTMLInputElement }) => void;
};

export const Header: React.FC<Props> = ({ array, setArray, animationDelay, handleAnimationDelayChange }: Props) => {
  const [arrayLength, setArrayLength] = useState<number>(0);
  const [isAnimationRunning, setAnimationRunning] = useState(false);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    setArrayLength(length);
    setArray(generateArrayOfRandomNumbers({ length }));
  };

  const sortArray = () => {
    setAnimationRunning(true);
    insertionSort(array, setArray, animationDelay).then(() => setAnimationRunning(false));
  };

  return (
    <header className={style.header}>
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
        <Select id="sortingAlgorithmSelect" options={Object.values(SortingAlgorithms)} disabled={isAnimationRunning} />
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
