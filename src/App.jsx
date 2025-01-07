import { useState } from 'react';
import './App.css';

function App() {
  const [year, setYear] = useState(0);
  const [newYearDay, setNewYearDay] = useState('');
  const [christmasDay, setChristmasDay] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const year = Number(e.target[0].value);
    const newYear = `${year} January 1`;
    const christmas = `${year} December 25`;

    setYear(year);

    setNewYearDay(() => {
      let dayOfWeek = findDayOfWeek(newYear);
      let dayOfMonth = 1;

      if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
        dayOfWeek === 'Saturday'
          ? (dayOfMonth = dayOfMonth + 2)
          : (dayOfMonth = dayOfMonth + 1);

        dayOfWeek = findDayOfWeek(`${year} January ${dayOfMonth}`);
      }

      return `${dayOfWeek}, ${dayOfMonth} January ${year} ${
        dayOfMonth > 1 ? '(Substitute Holiday)' : ''
      }`;
    });
    setChristmasDay(() => {
      let dayOfWeek = findDayOfWeek(christmas);
      let dayOfMonth = 25;

      if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
        dayOfWeek === 'Saturday'
          ? (dayOfMonth = dayOfMonth + 2)
          : (dayOfMonth = dayOfMonth + 1);

        dayOfWeek = findDayOfWeek(`${year} December ${dayOfMonth}`);
      }

      return `${dayOfWeek}, ${dayOfMonth} December ${year} ${
        dayOfMonth > 25 ? '(Substitute Holiday)' : ''
      }`;
    });
  }

  function findDayOfWeek(bankHoliday) {
    const date = new Date(bankHoliday);
    const lookupDayOfWeek = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };

    const dayOfWeek = lookupDayOfWeek[date.getDay()];

    return dayOfWeek;
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
        <p>Christmas Day: {christmasDay}</p>
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
