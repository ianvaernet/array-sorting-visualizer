import { Block } from '../types';
import { sleep } from './sleep';

const WIDTH = 65;

const updateBlocksArray = (
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  setArray(blocksArray.slice());
  return sleep(40 * animationDelay);
};

export const moveUp = (
  blocksArray: Block[],
  position: number,
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  blocksArray[position].y -= WIDTH;
  return updateBlocksArray(blocksArray, setArray, animationDelay);
};

export const moveDown = (
  blocksArray: Block[],
  position: number,
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  blocksArray[position].y += WIDTH;
  return updateBlocksArray(blocksArray, setArray, animationDelay);
};

export const moveLeft = (
  blocksArray: Block[],
  position: number,
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  blocksArray[position].x -= WIDTH;
  return updateBlocksArray(blocksArray, setArray, animationDelay);
};

export const moveRight = (
  blocksArray: Block[],
  position: number,
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => {
  blocksArray[position].x += WIDTH;
  return updateBlocksArray(blocksArray, setArray, animationDelay);
};
