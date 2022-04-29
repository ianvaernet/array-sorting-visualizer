import { UpdateBlocksArray } from '../types';
import { sleep } from './sleep';

export const updateBlocksArray: UpdateBlocksArray = (blocksArray, setArray, animationDelay) => {
  setArray(blocksArray.slice());
  return sleep(40 * animationDelay);
};
