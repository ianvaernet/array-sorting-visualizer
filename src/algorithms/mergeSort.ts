import { animatedSplit, split } from '../functions';
import { Block } from '../types';

function merge(
  blocksArray: Block[],
  array: { number: number; originalPosition: number }[],
  L: { number: number; originalPosition: number }[],
  R: { number: number; originalPosition: number }[],
  leftIndex: number
) {
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

const mergeSort = async (
  blocksArray: Block[],
  array: { number: number; originalPosition: number }[],
  leftIndex: number,
  rightIndex: number,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  depth: number
) => {
  if (leftIndex > rightIndex) return;
  const middle = leftIndex + Math.trunc((rightIndex - leftIndex) / 2);
  await animatedSplit(blocksArray, setSplittedArrayLevels, leftIndex, middle, rightIndex, depth);
  if (leftIndex === rightIndex) return;

  mergeSort(blocksArray, array, leftIndex, middle, setSplittedArrayLevels, depth + 1);
  mergeSort(blocksArray, array, middle + 1, rightIndex, setSplittedArrayLevels, depth + 1);

  const [L, R] = split(array, leftIndex, middle, rightIndex);
  merge(blocksArray, array, L, R, leftIndex);
};

export const invokeMergeSort = async (
  blocksArray: Block[],
  _: any,
  __: any,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>
) => {
  const arrayToSort = blocksArray.map(({ number }, index) => ({ number, originalPosition: index }));
  await mergeSort(blocksArray, arrayToSort, 0, blocksArray.length - 1, setSplittedArrayLevels, 0);
  // console.log(arrayToSort);
};
