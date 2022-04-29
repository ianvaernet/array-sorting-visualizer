import { Block, UseMove } from "../types"

export const BubbleSort = async (blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) => {

  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  const length = array.length;
  for (let indexToSort = 0; indexToSort < length - 1 ; indexToSort++) {
    let elementToSort = array[indexToSort];
    await moveDown(elementToSort.originalPosition);
    for (let indexToCompare = 0; indexToCompare < length - 1; indexToCompare++) {
      if (array[indexToCompare].number >  array[indexToCompare + 1].number) {
        
        var swap = array[indexToCompare];
        array[indexToCompare] = array[indexToCompare + 1 ]
        array[indexToCompare + 1 ] = swap;
        await moveRight(array[indexToCompare+1].originalPosition);
        await moveLeft(swap.originalPosition);
        indexToCompare--
      }
    }
    

    await moveUp(elementToSort.originalPosition);
    
  }
  return blocksArray;

};