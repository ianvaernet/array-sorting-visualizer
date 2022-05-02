export const shellSwap = (array: any[], i: number, j: number) => {
    /*const temp = array[i];
    array[i] = array[j];
    array[j] = temp;*/

    array[j] = array[i];
    const temp = array[i];
    array[j] = temp;
  };
  