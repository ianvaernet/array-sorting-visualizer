import { Block, UseMove } from '../types';

function half(n: number) {
  return Math.floor(n / 2);
}

export async function shellSort(blocksArray: Block[], { moveUp, moveDown, moveLeft, moveRight }: ReturnType<UseMove>) {
  const array = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  let length = array.length;
  for (let gap = half(length); gap > 0; gap = half(gap)) {
    for (let rightIndex = gap; rightIndex < length; rightIndex++) {
      let temp = array[rightIndex];
      let leftIndex = rightIndex;
      moveDown(temp.originalPosition);
      if (!(array[leftIndex - gap].number > temp.number)) {
        await moveUp(array[leftIndex - gap].originalPosition);
        moveDown(array[leftIndex - gap].originalPosition);
      }
      while (leftIndex >= gap && array[leftIndex - gap].number > temp.number) {
        array[leftIndex] = array[leftIndex - gap];
        await moveUp(array[leftIndex - gap].originalPosition);
        moveLeft(temp.originalPosition, gap);
        await moveRight(array[leftIndex].originalPosition, gap);
        moveDown(array[leftIndex - gap].originalPosition);
        leftIndex -= gap;
      }
      await moveUp(temp.originalPosition);
      array[leftIndex] = temp;
    }
  }
}
