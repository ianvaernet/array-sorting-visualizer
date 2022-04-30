import deepcopy from 'deepcopy';
import { Block } from '../types';
import { sleep } from './sleep';

export function split<T>(array: Array<T>, leftIndex: number, middle: number, rightIndex: number) {
  const L = deepcopy(array.slice(leftIndex, middle + 1));
  const R = deepcopy(array.slice(middle + 1, rightIndex + 1));
  return [L, R];
}

export async function animatedSplit(
  blocksArray: Block[],
  setSplittedArrayLevels: React.Dispatch<React.SetStateAction<Block[][][]>>,
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
  if (leftIndex < rightIndex) await sleep(600);
}
