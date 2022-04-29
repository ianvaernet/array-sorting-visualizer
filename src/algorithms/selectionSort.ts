import { swap } from '../functions';
import { Block, UseFocus, UseMove } from '../types';

export const selectionSort = async (
  blocksArray: Block[],
  { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>,
  { setFocus, removeFocus }: ReturnType<UseFocus>
) => {
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  for (let indexToSort = 0; indexToSort < length - 1; indexToSort++) {
    let minElementIndex = indexToSort;
    await moveUp(array[indexToSort].originalPosition);
    for (let indexToCompare = indexToSort + 1; indexToCompare < length; indexToCompare++) {
      await setFocus(array[indexToCompare].originalPosition);
      if (array[indexToCompare].number < array[minElementIndex].number) {
        if (minElementIndex !== indexToSort) await moveUp(array[minElementIndex].originalPosition);
        minElementIndex = indexToCompare;
        await moveDown(array[indexToCompare].originalPosition);
      }
      await removeFocus(array[indexToCompare].originalPosition);
    }
    if (minElementIndex !== indexToSort) {
      const positionsToMove = minElementIndex - indexToSort;
      await moveLeft(array[minElementIndex].originalPosition, positionsToMove);
      await moveUp(array[minElementIndex].originalPosition);
      await moveRight(array[indexToSort].originalPosition, positionsToMove);
    }
    await moveDown(array[indexToSort].originalPosition);
    swap(array, minElementIndex, indexToSort);
  }
};
