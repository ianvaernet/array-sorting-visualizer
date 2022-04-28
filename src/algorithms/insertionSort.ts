import { Block } from '../types';
import { moveDown, moveLeft, moveRight, moveUp } from '../functions';

export const insertionSort = async (
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  const arrayToSort = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  for (let indexToSort = 1; indexToSort < arrayToSort.length; indexToSort++) {
    let elementToSort = arrayToSort[indexToSort];
    await moveDown(blocksArray, elementToSort.originalPosition, setArray, animationDelay);
    let j = indexToSort - 1;
    while (j > -1 && elementToSort.number < arrayToSort[j].number) {
      arrayToSort[j + 1] = arrayToSort[j];
      await moveRight(blocksArray, arrayToSort[j].originalPosition, setArray, animationDelay);
      await moveLeft(blocksArray, elementToSort.originalPosition, setArray, animationDelay);
      j--;
    }
    arrayToSort[j + 1] = elementToSort;
    await moveUp(blocksArray, elementToSort.originalPosition, setArray, animationDelay);
  }
  return blocksArray;
};
