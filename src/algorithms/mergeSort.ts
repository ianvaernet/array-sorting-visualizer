import { Block } from '../types';

function merge(
  blocksArray: Block[],
  array: { number: number; originalPosition: number }[],
  leftIndex: number,
  middle: number,
  rightIndex: number
) {
  const L = array.slice(leftIndex, middle + 1);
  const R = array.slice(middle + 1, rightIndex + 1);
  const leftArrayLength = L.length;
  const rightArrayLength = R.length;

  let leftArrayIndex = 0;
  let rightArrayIndex = 0;
  let mergedArrayIndex = leftIndex;

  while (leftArrayIndex < leftArrayLength && rightArrayIndex < rightArrayLength) {
    if (L[leftArrayIndex].number <= R[rightArrayIndex].number) {
      array[mergedArrayIndex] = L[leftArrayIndex];
      leftArrayIndex++;
    } else {
      array[mergedArrayIndex] = R[rightArrayIndex];
      rightArrayIndex++;
    }
    mergedArrayIndex++;
  }

  // Copy the remaining elements of L[] or R[], if there are any
  if (leftArrayIndex < leftArrayLength)
    array.splice(mergedArrayIndex, leftArrayLength - leftArrayIndex, ...L.slice(leftArrayIndex));
  else if (rightArrayIndex < rightArrayLength)
    array.splice(mergedArrayIndex, rightArrayLength - rightArrayIndex, ...R.slice(rightArrayIndex));
}

const mergeSort = (
  blocksArray: Block[],
  array: { number: number; originalPosition: number }[],
  leftIndex: number,
  rightIndex: number
) => {
  if (leftIndex >= rightIndex) return;
  const middle = leftIndex + Math.trunc((rightIndex - leftIndex) / 2);
  mergeSort(blocksArray, array, leftIndex, middle);
  mergeSort(blocksArray, array, middle + 1, rightIndex);
  merge(blocksArray, array, leftIndex, middle, rightIndex);
};

export const invokeMergeSort = async (blocksArray: Block[]) => {
  const arrayToSort = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  mergeSort(blocksArray, arrayToSort, 0, blocksArray.length - 1);
  console.log(arrayToSort);
};
