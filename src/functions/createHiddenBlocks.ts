import deepcopy from 'deepcopy';
import { split } from '../algorithms/mergeSort';
import { Block } from '../types';
import style from '../components/ArrayBlock/style.module.css';

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
