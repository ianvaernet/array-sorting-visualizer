import { Block } from '../types';
import { sleep } from '../functions';

const WIDTH = 65;

export const insertionSort = async (inputArray: Block[], setArray: React.Dispatch<React.SetStateAction<Block[]>>) => {
  const renderedArray = inputArray.slice();
  const array = inputArray.map(({ number }) => number);
  for (let indexToSort = 1; indexToSort < array.length; indexToSort++) {
    let elementToSort = array[indexToSort];
    renderedArray[indexToSort].y += WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
    let j = indexToSort - 1;
    while (j > -1 && elementToSort < array[j]) {
      array[j + 1] = array[j];
      renderedArray[j].x += WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      renderedArray[indexToSort].x -= WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      j--;
    }
    array[j + 1] = elementToSort;
    renderedArray[indexToSort].y -= WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
  }
  return renderedArray;
};
