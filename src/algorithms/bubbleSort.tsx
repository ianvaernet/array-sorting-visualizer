import { swap } from '../functions';
import { Block, UseMove } from '../types';

export const bubbleSort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  for (let step = 0; step < length - 1; step++) {
    let elementsSwapped = false;
    for (let indexToCompare = 0; indexToCompare < length - step - 1; indexToCompare++) {
      const leftPosition = array[indexToCompare].originalPosition;
      const rightPosition = array[indexToCompare + 1].originalPosition;
      moveUp(leftPosition);
      await moveDown(rightPosition);
      if (array[indexToCompare].number > array[indexToCompare + 1].number) {
        elementsSwapped = true;
        swap(array, indexToCompare, indexToCompare + 1);
        moveRight(leftPosition);
        await moveLeft(rightPosition);
      }
      moveUp(rightPosition);
      await moveDown(leftPosition);
    }
    if (!elementsSwapped) break;
  }
};