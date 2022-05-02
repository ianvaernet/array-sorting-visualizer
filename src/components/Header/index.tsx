import React from 'react';
import { Button, Input, LabeledInput, Select } from '../../components';
import { SortingAlgorithms } from '../../types';
import style from './style.module.css';

type Props = {
  arrayLength: number;
  handleArrayLengthChange: ({ target }: { target: HTMLInputElement }) => void;
  selectedAlgorithm: SortingAlgorithms;
  setSelectedAlgorithm: (algorithm: SortingAlgorithms) => void;
  animationDelay: number;
  handleAnimationDelayChange: ({ target }: { target: HTMLInputElement }) => void;
  handleButtonClick: () => void;
  buttonText: string;
  isAnimationRunning: boolean;
};

export const Header: React.FC<Props> = ({
  arrayLength,
  handleArrayLengthChange,
  animationDelay,
  handleAnimationDelayChange,
  selectedAlgorithm,
  setSelectedAlgorithm,
  handleButtonClick,
  buttonText,
  isAnimationRunning,
}: Props) => {
  return (
    <header className={style.header}>
      <h1 className={style.title}>
        <b>Array sorting visualizer</b>
      </h1>
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
            min={0.1}
          />
        </LabeledInput>
      </div>
      <div className={style.inputContainer}>
        <Button onClick={handleButtonClick} disabled={isAnimationRunning}>
          {buttonText}
        </Button>
      </div>
    </header>
  );
};
