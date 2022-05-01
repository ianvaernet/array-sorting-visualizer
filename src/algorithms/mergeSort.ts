/* eslint-disable no-loop-func */
import { AnimatedSplit, sleep, split } from '../functions';
import { Block } from '../types';
import style from '../components/ArrayBlock/style.module.css';
import deepcopy from 'deepcopy';

function mapIndexToSplittedArray<T>(splittedArrays: T[][], searchedIndex: number) {
  let totalLength = 0;
  let index = 0;
  for (let splittedArray of splittedArrays) {
    totalLength += splittedArray.length;
    if (totalLength > searchedIndex) break;
    index++;
  }
  return index;
}

function updateArrayElement<T>(array: T[], index: number, update: (element: T) => void) {
  const arrayCopy = deepcopy(array);
  update(arrayCopy[index]);
  return arrayCopy;
}

async function hideMergedArray(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  depth: number,
  mergedArrayIndex: number
) {
  if (depth > 0) {
    setSplittedArrayLevels((splittedArrayLevels: Block[][][]) => {
      const currentLevel = splittedArrayLevels[depth - 1];
      const mergedBlocksArrayIndex = mapIndexToSplittedArray(currentLevel, mergedArrayIndex);
      const updatedLevel = updateArrayElement(currentLevel, mergedBlocksArrayIndex, (mergedBlocksArray) => {
        mergedBlocksArray.forEach((arrayBlock) => (arrayBlock.classNames = [style.hidden]));
      });
      const upperLevels = splittedArrayLevels.slice(0, depth - 1);
      const lowerLevels = splittedArrayLevels.slice(depth);
      return [...upperLevels, updatedLevel, ...lowerLevels];
    });
    await sleep(400);
  }
}

async function showSplittedArray(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  depth: number,
  mergedArrayIndex: number
) {
  if (depth > 0) {
    setSplittedArrayLevels((splittedArrayLevels: Block[][][]) => {
      const currentLevel = splittedArrayLevels[depth - 1];
      const mergedBlocksArrayIndex = mapIndexToSplittedArray(currentLevel, mergedArrayIndex);
      const updatedLevel = updateArrayElement(currentLevel, mergedBlocksArrayIndex, (mergedBlocksArray) => {
        mergedBlocksArray.forEach((arrayBlock) => (arrayBlock.classNames = [style.visible]));
      });
      const upperLevels = splittedArrayLevels.slice(0, depth - 1);
      const lowerLevels = splittedArrayLevels.slice(depth);
      return [...upperLevels, updatedLevel, ...lowerLevels];
    });
    await sleep(400);
  }
}

async function replaceElement(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  depth: number,
  mergedArrayIndex: number,
  indexToReplace: number,
  numberToReplaceWith: number
) {
  if (depth > 0) {
    setSplittedArrayLevels((splittedArrayLevels: Block[][][]) => {
      const currentLevel = splittedArrayLevels[depth - 1];
      const mergedBlocksArrayIndex = mapIndexToSplittedArray(currentLevel, mergedArrayIndex);
      const updatedLevel = updateArrayElement(currentLevel, mergedBlocksArrayIndex, (mergedBlocksArray) => {
        mergedBlocksArray[indexToReplace].number = numberToReplaceWith;
        mergedBlocksArray[indexToReplace].classNames = [style.visible];
      });
      const upperLevels = splittedArrayLevels.slice(0, depth - 1);
      const lowerLevels = splittedArrayLevels.slice(depth);
      return [...upperLevels, updatedLevel, ...lowerLevels];
    });
    await sleep(400);
  }
}

async function merge(
  array: number[],
  L: number[],
  R: number[],
  leftIndex: number,
  depth: number,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>
) {
  const leftArrayLength = L.length;
  const rightArrayLength = R.length;
  let leftArrayIndex = 0;
  let rightArrayIndex = 0;
  let mergedArrayIndex = leftIndex;
  await hideMergedArray(setSplittedArrayLevels, depth, mergedArrayIndex);

  while (leftArrayIndex < leftArrayLength && rightArrayIndex < rightArrayLength) {
    if (L[leftArrayIndex] <= R[rightArrayIndex]) {
      await replaceElement(setSplittedArrayLevels, depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, L[leftArrayIndex]);
      array[mergedArrayIndex] = L[leftArrayIndex];
      leftArrayIndex++;
    } else {
      await replaceElement(setSplittedArrayLevels, depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, R[rightArrayIndex]);
      array[mergedArrayIndex] = R[rightArrayIndex];
      rightArrayIndex++;
    }
    mergedArrayIndex++;
  }

  // Copy the remaining elements of L[] or R[], if there are any
  while (leftArrayIndex < leftArrayLength) {
    await replaceElement(setSplittedArrayLevels, depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, L[leftArrayIndex]);
    array[mergedArrayIndex] = L[leftArrayIndex];
    leftArrayIndex++;
    mergedArrayIndex++;
  }
  while (rightArrayIndex < rightArrayLength) {
    await replaceElement(setSplittedArrayLevels, depth, mergedArrayIndex, leftArrayIndex + rightArrayIndex, R[rightArrayIndex]);
    array[mergedArrayIndex] = R[rightArrayIndex];
    rightArrayIndex++;
    mergedArrayIndex++;
  }
}

const mergeSort = async (
  array: number[],
  animatedSplit: AnimatedSplit,
  leftIndex: number,
  rightIndex: number,
  depth: number,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>
) => {
  if (leftIndex > rightIndex) return;
  const middle = leftIndex + Math.trunc((rightIndex - leftIndex) / 2);
  await showSplittedArray(setSplittedArrayLevels, depth, leftIndex);
  if (leftIndex === rightIndex) return;

  await mergeSort(array, animatedSplit, leftIndex, middle, depth + 1, setSplittedArrayLevels);
  await mergeSort(array, animatedSplit, middle + 1, rightIndex, depth + 1, setSplittedArrayLevels);

  const [L, R] = split(array, leftIndex, middle, rightIndex);
  await merge(array, L, R, leftIndex, depth, setSplittedArrayLevels);
};

export const invokeMergeSort = async (
  blocksArray: Block[],
  _: any,
  __: any,
  animatedSplit: AnimatedSplit,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>
) => {
  const arrayToSort = blocksArray.map(({ number }) => number);
  await mergeSort(arrayToSort, animatedSplit, 0, blocksArray.length - 1, 1, setSplittedArrayLevels);
};
