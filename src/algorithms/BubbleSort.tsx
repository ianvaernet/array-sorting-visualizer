import { sleep } from "../functions/sleep";
import { Block } from "../types";

const WIDTH = 65;

const BubbleSort = async (inputArray: Block[], setArray: React.Dispatch<React.SetStateAction<Block[]>>) => {

  const renderedArray = inputArray.slice();
  const array = inputArray.map(({ number }) => number);
  for (let indexToSort = 0; indexToSort < array.length; indexToSort++) {
    let elementToSort = array[indexToSort];
    renderedArray[indexToSort].y += WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
    let j = indexToSort - 1;
    while (j >= 0 && elementToSort < array[j]) {
      array[j + 1] = array[j];
      renderedArray[j].x += WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      renderedArray[indexToSort].x -= WIDTH;
      setArray(renderedArray.slice());
      await sleep(200);
      j--;
    }
    array[j + 1] = elementToSort;
    renderedArray[indexToSort].y -= WIDTH;
    setArray(renderedArray.slice());
    await sleep(200);
  }
  return renderedArray

}

export default BubbleSort