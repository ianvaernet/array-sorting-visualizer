import { Block, UseMove } from '../types';
import { shellSwap } from '../functions/shellSwap';

export const shellSort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  let increment = length / 2;

  for (let step = 1; step < length ; step++) {
    let elementsSwapped = false;
    for (let indexToCompare = 0; indexToCompare < length - step - 1; indexToCompare++) {
      const leftPosition = array[indexToCompare].originalPosition;
      const rightPosition = array[indexToCompare + increment].originalPosition;
      let temp = array[indexToCompare].number;
      moveUp(leftPosition);
      await moveDown(rightPosition);
      while (indexToCompare >= -1 && array[indexToCompare].number > array[indexToCompare + increment].number) {
        elementsSwapped = true;
        shellSwap(array, indexToCompare, indexToCompare + 1 );
        await moveRight(leftPosition);
        await moveLeft(rightPosition );
        temp  = temp - increment;
      }
      moveUp(rightPosition);
      await moveDown(leftPosition);
     
    }
    if (!elementsSwapped) break;
  }


};
