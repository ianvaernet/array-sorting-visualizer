import { useEffect, useState } from 'react';
import { ArrayElement, Input } from './components';
import { generateArrayOfRandomNumbers } from './functions/generateArrayOfRandomNumbers';

function App() {
  const [arrayLength, setArrayLength] = useState<number>(1);
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    setArray(generateArrayOfRandomNumbers({ length: arrayLength }));
  }, [arrayLength]);

  const handleArrayLengthChange = ({ target }: { target: HTMLInputElement }) => setArrayLength(parseInt(target.value));

  return (
    <div>
      <header className="App-header">
        <Input label="Enter the array length" value={arrayLength} onChange={handleArrayLengthChange} />
        <div>
          {array.map((element) => (
            <ArrayElement element={element} />
          ))}
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default App;
