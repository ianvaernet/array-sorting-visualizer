import deepcopy from 'deepcopy';
import { SplitAndMergeAnimations } from '../functions';
import { Block } from '../types';

export function split<T>(array: Array<T>, leftIndex: number, middle: number, rightIndex: number) {
  const L = deepcopy(array.slice(leftIndex, middle + 1));
  const R = deepcopy(array.slice(middle + 1, rightIndex + 1));
  return [L, R];
}

async function merge(
  array: number[],
  L: number[],
  R: number[],
  leftIndex: number,
  depth: number,
  { hideMergedArray, replaceElement }: SplitAndMergeAnimations
) {
  const leftArrayLength = L.length;
  const rightArrayLength = R.length;
  let leftArrayIndex = 0;
  let rightArrayIndex = 0;
  let mergedArrayIndex = leftIndex;
  await hideMergedArray(depth, mergedArrayIndex);

  while (leftArrayIndex < leftArrayLength && rightArrayIndex < rightArrayLength) {
    if (L[leftArrayIndex] <= R[rightArrayIndex]) {
      await replaceElement(depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, L[leftArrayIndex]);
      array[mergedArrayIndex] = L[leftArrayIndex];
      leftArrayIndex++;
    } else {
      await replaceElement(depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, R[rightArrayIndex]);
      array[mergedArrayIndex] = R[rightArrayIndex];
      rightArrayIndex++;
    }
    mergedArrayIndex++;
  }

  // Copy the remaining elements of L[] or R[], if there are any
  while (leftArrayIndex < leftArrayLength) {
    await replaceElement(depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, L[leftArrayIndex]);
    array[mergedArrayIndex] = L[leftArrayIndex];
    leftArrayIndex++;
    mergedArrayIndex++;
  }
  while (rightArrayIndex < rightArrayLength) {
    await replaceElement(depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, R[rightArrayIndex]);
    array[mergedArrayIndex] = R[rightArrayIndex];
    rightArrayIndex++;
    mergedArrayIndex++;
  }
}

const mergeSort = async (
  array: number[],
  leftIndex: number,
  rightIndex: number,
  depth: number,
  splitAndMerge: SplitAndMergeAnimations
) => {
  if (leftIndex > rightIndex) return;
  const middle = leftIndex + Math.trunc((rightIndex - leftIndex) / 2);
  await splitAndMerge.showSplittedArray(depth, leftIndex);
  if (leftIndex === rightIndex) return;

  await mergeSort(array, leftIndex, middle, depth + 1, splitAndMerge);
  await mergeSort(array, middle + 1, rightIndex, depth + 1, splitAndMerge);

  const [L, R] = split(array, leftIndex, middle, rightIndex);
  await merge(array, L, R, leftIndex, depth, splitAndMerge);
};

export const invokeMergeSort = async (blocksArray: Block[], _: any, __: any, splitAndMerge: SplitAndMergeAnimations) => {
  const arrayToSort = blocksArray.map(({ number }) => number);
  await mergeSort(arrayToSort, 0, blocksArray.length - 1, 1, splitAndMerge);
};
