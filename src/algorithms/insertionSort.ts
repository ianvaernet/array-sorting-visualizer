import { Block } from '../types';
import { sleep } from '../functions';

const WIDTH = 65;

export const insertionSort = async (inputArray: Block[], setArray: React.Dispatch<React.SetStateAction<Block[]>>) => {
  const renderedArray = inputArray.slice();
  const arrayToSort = inputArray.map(({ number }, index) => ({ number, originalPosition: index }));
  for (let indexToSort = 1; indexToSort < arrayToSort.length; indexToSort++) {
    let elementToSort = arrayToSort[indexToSort];
    renderedArray[arrayToSort[indexToSort].originalPosition].y += WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
    let j = indexToSort - 1;
    while (j > -1 && elementToSort.number < arrayToSort[j].number) {
      arrayToSort[j + 1] = arrayToSort[j];
      renderedArray[arrayToSort[j].originalPosition].x += WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      renderedArray[elementToSort.originalPosition].x -= WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      j--;
    }
    arrayToSort[j + 1] = elementToSort;
    renderedArray[elementToSort.originalPosition].y -= WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
  }
  return renderedArray;
};
