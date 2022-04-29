import { Block, UseMove } from "../types"

export const BubbleSort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {

  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  for (let indexToSort = 0; indexToSort < length ; indexToSort++) {
    let elementToSort = array[indexToSort];
    await moveDown(elementToSort.originalPosition);
    let indexToCompare = indexToSort - 1;
    
    while (indexToCompare > -1 && elementToSort.number < array[indexToCompare].number) {
      array[indexToCompare + 1] = array[indexToCompare];
      await moveRight(array[indexToCompare].originalPosition);
      await moveLeft(elementToSort.originalPosition);
      indexToCompare--;
    }
    array[indexToCompare + 1] = elementToSort;
    await moveUp(elementToSort.originalPosition);
  }
  return blocksArray;

};