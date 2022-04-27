
const swap = (arr: number[], i: number, j: number) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

const BubbleSort = (ArrayElement: number[]) => {

    const arraCopy = ArrayElement.slice() 
    const neworder = []

    let i, j

    for (i = 0; i < arraCopy.length; i++) {
        for (j = 0; j < arraCopy.length - i - 1; j++) {
        neworder.push([j, j + 1, null, null]) 
        if (arraCopy[j] > arraCopy[j + 1]) {
            swap(arraCopy, j, j + 1)
            neworder.push([j, j + 1, arraCopy.slice(), null]) 
        }
        }
        neworder.push([null, null, null, j]) 
    }

  return neworder

}

export default BubbleSort