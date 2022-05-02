import { Block, UseMove } from '../types';

export const binarySort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  let high = length - 1;
  let low = 0;
  const mid = low + Math.floor((high - low) / 2);

  for (let indexToSort = mid; indexToSort < length; indexToSort++) {
    let indexToCompare = indexToSort - 1;
    let elementToSort = array[indexToSort];
    await moveDown(elementToSort.originalPosition);
    while (indexToCompare >= mid && elementToSort.number < array[indexToCompare].number) {
      array[indexToCompare + 1] = array[indexToCompare];
      moveRight(array[indexToCompare].originalPosition);
      await moveLeft(elementToSort.originalPosition);
      indexToCompare--;
    }
    array[indexToCompare + 1] = elementToSort;
    await moveUp(elementToSort.originalPosition);
  }

  for (let newIndexToSort = 1; newIndexToSort < length; newIndexToSort++) {
    let newIndexToCompare = newIndexToSort - 1;
    let newElementToSort = array[newIndexToSort];
    await moveDown(newElementToSort.originalPosition);
    while (newIndexToCompare > -1 && newElementToSort.number < array[newIndexToCompare].number) {
      array[newIndexToCompare + 1] = array[newIndexToCompare];
      moveRight(array[newIndexToCompare].originalPosition);
      await moveLeft(newElementToSort.originalPosition);
      newIndexToCompare--;
    }
    array[newIndexToCompare + 1] = newElementToSort;
    await moveUp(newElementToSort.originalPosition);
  }
};
