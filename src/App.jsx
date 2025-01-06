import { useState } from 'react';
import './App.css';

function App() {
  const [year, setYear] = useState(0);
  const [newYearDay, setNewYearDay] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const year = Number(e.target[0].value)

    setYear(year);
    setNewYearDay(`1 January ${year}`)
  }

  function handleClear(e) {
    e.preventDefault();

    setYear(setYear(0));
  }

  if (year) {
    return (
      <>
        <h1>Success: {year}</h1>
        <br />
        <p>New Year's Day: {newYearDay}</p>
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
