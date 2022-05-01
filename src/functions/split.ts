import deepcopy from 'deepcopy';
import { Block } from '../types';
import { sleep } from './sleep';

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
