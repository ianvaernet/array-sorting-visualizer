import { Block, UseMove } from '../types';

export const insertionSort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {
  // The blocksArray cannot be reordered because the position of its elements is changed by animations
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  for (let indexToSort = 1; indexToSort < array.length; indexToSort++) {
    let elementToSort = array[indexToSort];
    await moveDown(elementToSort.originalPosition);
    let indexToCompare = indexToSort - 1;
    while (indexToCompare > -1 && elementToSort.number < array[indexToCompare].number) {
      array[indexToCompare + 1] = array[indexToCompare];
      moveRight(array[indexToCompare].originalPosition);
      await moveLeft(elementToSort.originalPosition);
      indexToCompare--;
    }
    array[indexToCompare + 1] = elementToSort;
    await moveUp(elementToSort.originalPosition);
  }
};
