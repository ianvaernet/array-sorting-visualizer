import { useState } from 'react';
import { insertionSort } from '../../algorithms';
import { ArrayElement, Button, Input, Select } from '../../components';
import { LabeledInput } from '../../components/LabeledInput';
import { generateArrayOfRandomNumbers } from '../../functions';
import { Block, SortingAlgorithms } from '../../types';
import style from './style.module.css';
import { Test } from './test';

export const App = () => {
  const [arrayLength, setArrayLength] = useState<number>(0);
  const [array, setArray] = useState<Block[]>([]);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => {
    const length = parseInt(target.value);
    setArrayLength(length);
    setArray(generateArrayOfRandomNumbers({ length }));
  };

  const sortArray = () => {
    insertionSort(array, setArray);
  };

  return (
    <div className={style.app_container}>
      <Test />
      <header className={style.header}>
        <div className={style.arrayLengthInput}>
          <LabeledInput label="Enter the array length:">
            <Input id="arrayLengthInput" type="number" value={arrayLength} onChange={handleArrayLengthChange} />
          </LabeledInput>
        </div>
        <LabeledInput label="Select the sorting algorithm:">
          <Select id="sortingAlgorithmSelect" options={Object.values(SortingAlgorithms)} />
        </LabeledInput>
        <div>
          <Button onClick={sortArray}>Play</Button>
        </div>
      </header>
      <main>
        <div className={style.array_container}>
          {array.map(({ key, number, x, y }) => (
            <ArrayElement key={key} number={number} x={x} y={y} />
          ))}
        </div>
      </main>
    </div>
  );
};
