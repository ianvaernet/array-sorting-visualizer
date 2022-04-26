import { useEffect, useState } from 'react';
import { ArrayElement, Button, Input, Select } from '../../components';
import { LabeledInput } from '../../components/LabeledInput';
import { generateArrayOfRandomNumbers } from '../../functions';
import { SortingAlgorithms } from '../../types';
import style from './style.module.css';

export const App = () => {
  const [arrayLength, setArrayLength] = useState<number>(1);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    setArray(generateArrayOfRandomNumbers({ length: arrayLength }));
  }, [arrayLength]);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => setArrayLength(parseInt(target.value));

  return (
    <div className={style.app_container}>
      <header className={style.header}>
        <div className={style.arrayLengthInput}>
          <LabeledInput label="Enter the array length:">
            <Input id="arrayLengthInput" type="number" value={arrayLength} onChange={handleArrayLengthChange} />
          </LabeledInput>
        </div>
        <LabeledInput label="Select the sorting algorithm:">
          <Select id="sortingAlgorithmSelect" options={Object.values(SortingAlgorithms)} />
        </LabeledInput>
        <div className={style.array_container}>
          {array.map((element) => (
            <ArrayElement element={element} />
          ))}
        </div>
        <Button>Play</Button>
      </header>
      <main></main>
    </div>
  );
};
