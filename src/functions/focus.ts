import { Block, UseFocus } from '../types';
import { updateBlocksArray } from './updateBlocksArray';
import style from '../components/ArrayBlock/style.module.css';

const setFocus = (blocksArray: Block[], position: number, updateBlocksArray: any) => {
  blocksArray[position].classNames = [style.focus];
  return updateBlocksArray(blocksArray);
};

const removeFocus = (blocksArray: Block[], position: number, updateBlocksArray: any) => {
  blocksArray[position].classNames = [];
  return updateBlocksArray(blocksArray);
};

export const useFocus: UseFocus = (blocksArray, setArray, animationDelay) => {
  const updateArray = () => updateBlocksArray(blocksArray, setArray, animationDelay);
  return {
    setFocus: (position) => setFocus(blocksArray, position, updateArray),
    removeFocus: (position) => removeFocus(blocksArray, position, updateArray),
  };
};
