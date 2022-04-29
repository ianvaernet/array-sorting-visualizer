import { Block, Sleep, UseMove } from '../types';
import { updateBlocksArray } from './updateBlocksArray';

const WIDTH = 65;

type UpdateArray = (blocksArray: Block[]) => ReturnType<Sleep>;
type MoveDirection = (
  blocksArray: Block[],
  position: number,
  updateBlocksArray: UpdateArray,
  movements?: number
) => ReturnType<UpdateArray>;

const moveUp: MoveDirection = (blocksArray, position, updateBlocksArray, movements = 1) => {
  blocksArray[position].y -= WIDTH * movements;
  return updateBlocksArray(blocksArray);
};

const moveDown: MoveDirection = (blocksArray, position, updateBlocksArray, movements = 1) => {
  blocksArray[position].y += WIDTH * movements;
  return updateBlocksArray(blocksArray);
};

const moveLeft: MoveDirection = (blocksArray, position, updateBlocksArray, movements = 1) => {
  blocksArray[position].x -= WIDTH * movements;
  return updateBlocksArray(blocksArray);
};

const moveRight: MoveDirection = (blocksArray, position, updateBlocksArray, movements = 1) => {
  blocksArray[position].x += WIDTH * movements;
  return updateBlocksArray(blocksArray);
};

export const useMove: UseMove = (blocksArray, setArray, animationDelay) => {
  const updateArray = () => updateBlocksArray(blocksArray, setArray, animationDelay);
  return {
    moveUp: (position, movements) => moveUp(blocksArray, position, updateArray, movements),
    moveDown: (position, movements) => moveDown(blocksArray, position, updateArray, movements),
    moveLeft: (position, movements) => moveLeft(blocksArray, position, updateArray, movements),
    moveRight: (position, movements) => moveRight(blocksArray, position, updateArray, movements),
  };
};
