export enum SortingAlgorithms {
  BubbleSort = 'Bubble Sort',
  BinaryInsertionSort = 'Binary Insertion Sort',
  InsertionSort = 'Insertion Sort',
  SelectionSort = 'Selection Sort',
  MergeSort = 'Merge Sort',
  ShellSort = 'Shell Sort'
}

export type Block = {
  key: number;
  number: number;
  x: number;
  y: number;
  classNames: string[];
};

export type Focus = (position: number) => ReturnType<UpdateBlocksArray>;

export type Move = (position: number, movements?: number) => ReturnType<UpdateBlocksArray>;

export type Sleep = (miliseconds: number) => Promise<void>;

export type UseMove = (
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => { moveUp: Move; moveDown: Move; moveLeft: Move; moveRight: Move };

export type UseFocus = (
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => { setFocus: Focus; removeFocus: Focus };

export type UpdateBlocksArray = (
  blocksArray: Block[],
  setArray: React.Dispatch<React.SetStateAction<Block[]>>,
  animationDelay: number
) => ReturnType<Sleep>;
