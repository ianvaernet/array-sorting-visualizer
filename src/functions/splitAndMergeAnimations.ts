import deepcopy from 'deepcopy';
import { Block } from '../types';
import { sleep } from './sleep';
import style from '../components/ArrayBlock/style.module.css';

export type SplitAndMergeAnimations = {
  hideMergedArray: (depth: number, mergedArrayIndex: number) => Promise<void>;
  showSplittedArray: (depth: number, mergedArrayIndex: number) => Promise<void>;
  replaceElement: (depth: number, mergedArrayIndex: number, indexToReplace: number, numberToReplaceWith: number) => Promise<void>;
};

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

function updateArrayLevel<T>(
  setArrayevels: React.Dispatch<React.SetStateAction<T[][][]>>,
  depth: number,
  update: (currentLevel: T[][]) => T[][]
) {
  setArrayevels((arrayLevels: T[][][]) => {
    const currentLevel = arrayLevels[depth];
    const updatedLevel = update(currentLevel);
    const upperLevels = arrayLevels.slice(0, depth);
    const lowerLevels = arrayLevels.slice(depth + 1);
    return [...upperLevels, updatedLevel, ...lowerLevels];
  });
}

async function changeArrayClassNames(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number,
  depth: number,
  mergedArrayIndex: number,
  classNames: string[]
) {
  updateArrayLevel(setSplittedArrayLevels, depth - 1, (currentLevel) => {
    const mergedBlocksArrayIndex = mapIndexToSplittedArray(currentLevel, mergedArrayIndex);
    return updateArrayElement(currentLevel, mergedBlocksArrayIndex, (mergedBlocksArray) => {
      mergedBlocksArray.forEach((arrayBlock) => (arrayBlock.classNames = classNames));
    });
  });
  await sleep(40 * animationDelay);
}

async function hideMergedArray(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number,
  depth: number,
  mergedArrayIndex: number
) {
  await changeArrayClassNames(setSplittedArrayLevels, animationDelay, depth, mergedArrayIndex, [style.hidden]);
}

async function showSplittedArray(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number,
  depth: number,
  mergedArrayIndex: number
) {
  await changeArrayClassNames(setSplittedArrayLevels, animationDelay, depth, mergedArrayIndex, [style.visible]);
}

async function replaceElement(
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number,
  depth: number,
  mergedArrayIndex: number,
  indexToReplace: number,
  numberToReplaceWith: number
) {
  updateArrayLevel(setSplittedArrayLevels, depth - 1, (currentLevel) => {
    const mergedBlocksArrayIndex = mapIndexToSplittedArray(currentLevel, mergedArrayIndex);
    return updateArrayElement(currentLevel, mergedBlocksArrayIndex, (mergedBlocksArray) => {
      mergedBlocksArray[indexToReplace].number = numberToReplaceWith;
      mergedBlocksArray[indexToReplace].classNames = [style.visible];
    });
  });
  await sleep(40 * animationDelay);
}

export const useSplitAndMergeAnimations = (
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number
) => {
  return {
    hideMergedArray: (depth: number, mergedArrayIndex: number) =>
      hideMergedArray(setSplittedArrayLevels, animationDelay, depth, mergedArrayIndex),
    showSplittedArray: (depth: number, mergedArrayIndex: number) =>
      showSplittedArray(setSplittedArrayLevels, animationDelay, depth, mergedArrayIndex),
    replaceElement: (depth: number, mergedArrayIndex: number, indexToReplace: number, numberToReplaceWith: number) =>
      replaceElement(setSplittedArrayLevels, animationDelay, depth, mergedArrayIndex, indexToReplace, numberToReplaceWith),
  };
};
