import { useState } from 'react';
import './App.css';

function App() {
  const [year, setYear] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    setYear(Number(e.target[0].value));
  }

  function handleClear(e) {
    e.preventDefault();

    setYear(setYear(0));
  }

  if (year) {
    return (
      <>
        <h1>Success: {year}</h1>
        <button onClick={handleClear}>Back</button>
      </>
    );
  }

  return (
    <>
      <h1>Bank Holiday Calculator</h1>
      <br />
      <h2>Enter Year: </h2>
      <form onSubmit={handleSubmit}>
        <input type="string" />
        <input type="submit" value="check" />
      </form>
    </>
  );
}

export default App;
