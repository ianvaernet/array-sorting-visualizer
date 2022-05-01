import deepcopy from 'deepcopy';
import { Block } from '../types';
import { sleep } from './sleep';
import style from '../components/ArrayBlock/style.module.css';

export type AnimatedSplit = (leftIndex: number, middle: number, rightIndex: number, depth: number) => Promise<void>;

export function split<T>(array: Array<T>, leftIndex: number, middle: number, rightIndex: number) {
  const L = deepcopy(array.slice(leftIndex, middle + 1));
  const R = deepcopy(array.slice(middle + 1, rightIndex + 1));
  return [L, R];
}

async function animatedSplit(
  blocksArray: Block[],
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number,
  leftIndex: number,
  middle: number,
  rightIndex: number,
  depth: number
) {
  setSplittedArrayLevels((splittedArrayLevels: Block[][][]) => {
    if (leftIndex === rightIndex) {
      const array = deepcopy(splittedArrayLevels);
      if (splittedArrayLevels[depth]) array[depth].push(deepcopy([blocksArray[leftIndex]]));
      return array;
    } else {
      const upperLevels = deepcopy(splittedArrayLevels.slice(0, depth));
      let currentLevel = deepcopy(splittedArrayLevels[depth]) ?? [];
      const lowerLevels = deepcopy(splittedArrayLevels.slice(depth + 1));
      const [L, R] = split(blocksArray, leftIndex, middle, rightIndex);
      currentLevel.push(L, R);
      return [...upperLevels, currentLevel, ...lowerLevels];
    }
  });
  if (leftIndex < rightIndex) await sleep(animationDelay * 100);
}

export const useAnimatedSplit = (
  blocksArray: Block[],
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
  animationDelay: number
): AnimatedSplit => {
  return (leftIndex: number, middle: number, rightIndex: number, depth: number) =>
    animatedSplit(blocksArray, setSplittedArrayLevels, animationDelay, leftIndex, middle, rightIndex, depth);
};

function splitArrayIntoLevels<T>(array: T[], multilevelArray: T[][][], depth: number) {
  if (!array[1]) {
    if (multilevelArray[depth]) multilevelArray[depth].push(array);
    return;
  }
  if (!multilevelArray[depth]) multilevelArray[depth] = [];
  const middle = Math.trunc((array.length - 1) / 2);
  const [L, R] = split(array, 0, middle, array.length);
  multilevelArray[depth].push(L, R);

  splitArrayIntoLevels(L, multilevelArray, depth + 1);
  splitArrayIntoLevels(R, multilevelArray, depth + 1);
}

export function createHiddenBlocks(
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>
) {
  const array = deepcopy(blocksArray).map((block) => {
    block.classNames = [style.hidden];
    return block;
  });
  const multilevelArray = [[deepcopy(array)]];
  splitArrayIntoLevels(array, multilevelArray, 1);
  console.log(multilevelArray);
  setSplittedArrayLevels(multilevelArray);
  setArray([]);
}
