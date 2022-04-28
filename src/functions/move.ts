import { Block, Sleep, UpdateBlocksArray, UseMove } from '../types';
import { sleep } from './sleep';

const WIDTH = 65;

type UpdateArray = (blocksArray: Block[]) => ReturnType<Sleep>;
type MoveDirection = (blocksArray: Block[], position: number, updateBlocksArray: UpdateArray) => ReturnType<UpdateArray>;

const updateBlocksArray: UpdateBlocksArray = (blocksArray, setArray, animationDelay) => {
  setArray(blocksArray.slice());
  return sleep(40 * animationDelay);
};

const moveUp: MoveDirection = (blocksArray, position, updateBlocksArray) => {
  blocksArray[position].y -= WIDTH;
  return updateBlocksArray(blocksArray);
};

const moveDown: MoveDirection = (blocksArray, position, updateBlocksArray) => {
  blocksArray[position].y += WIDTH;
  return updateBlocksArray(blocksArray);
};

const moveLeft: MoveDirection = (blocksArray, position, updateBlocksArray) => {
  blocksArray[position].x -= WIDTH;
  return updateBlocksArray(blocksArray);
};

const moveRight: MoveDirection = (blocksArray, position, updateBlocksArray) => {
  blocksArray[position].x += WIDTH;
  return updateBlocksArray(blocksArray);
};

export const useMove: UseMove = (blocksArray, setArray, animationDelay) => {
  const updateArray = () => updateBlocksArray(blocksArray, setArray, animationDelay);
  return {
    moveUp: (position) => moveUp(blocksArray, position, updateArray),
    moveDown: (position) => moveDown(blocksArray, position, updateArray),
    moveLeft: (position) => moveLeft(blocksArray, position, updateArray),
    moveRight: (position) => moveRight(blocksArray, position, updateArray),
  };
};
