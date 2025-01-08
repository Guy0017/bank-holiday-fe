import { useState } from 'react';
import './App.css';

function App() {
  const [year, setYear] = useState(0);
  const [newYearDay, setNewYearDay] = useState('');
  const [christmasDay, setChristmasDay] = useState('');
  const [boxingDay, setBoxingDay] = useState('');
  const [earlyMayDay, setEarlyMayDay] = useState('');
  const [lateMayDay, setLateMayDay] = useState('');
  const [summerDay, setSummerDay] = useState('');
  const [goodFriday, setGoodFriday] = useState('');
  const [easterMonday, setEasterMonday] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const year = Number(e.target[0].value);
    const newYear = `${year} January 1`;
    const christmas = `${year} December 25`;
    const boxing = `${year} December 26`;
    const firstMondayMay = `${year} May 1`;
    const lastMondayMay = `${year} May 31`;
    const lastMondayAuguest = `${year} August 31`;
    const easterSunday = gaussAlgorithm(year);

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

    setBoxingDay(() => {
      let dayOfWeek = findDayOfWeek(boxing);
      let dayOfMonth = 26;

      if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
        dayOfWeek === 'Saturday'
          ? (dayOfMonth = dayOfMonth + 2)
          : (dayOfMonth = dayOfMonth + 1);

        dayOfWeek = findDayOfWeek(`${year} December ${dayOfMonth}`);
      }

      return `${dayOfWeek}, ${dayOfMonth} December ${year} ${
        dayOfMonth > 26 ? '(Substitute Holiday)' : ''
      }`;
    });

    setEarlyMayDay(() => {
      let dayOfWeek = findDayOfWeek(firstMondayMay);
      let dayOfMonth = 1;

      if (dayOfWeek !== 'Monday') {
        do {
          dayOfMonth++;
          dayOfWeek = findDayOfWeek(`${year} May ${dayOfMonth}`);
        } while (dayOfWeek !== 'Monday');
      }

      return `${dayOfWeek}, ${dayOfMonth} May ${year}`;
    });

    setLateMayDay(() => {
      let dayOfWeek = findDayOfWeek(lastMondayMay);
      let dayOfMonth = 31;

      if (dayOfWeek !== 'Monday') {
        do {
          dayOfMonth--;
          dayOfWeek = findDayOfWeek(`${year} May ${dayOfMonth}`);
        } while (dayOfWeek !== 'Monday');
      }

      return `${dayOfWeek}, ${dayOfMonth} May ${year}`;
    });

    setSummerDay(() => {
      let dayOfWeek = findDayOfWeek(lastMondayAuguest);
      let dayOfMonth = 31;

      if (dayOfWeek !== 'Monday') {
        do {
          dayOfMonth--;
          dayOfWeek = findDayOfWeek(`${year} August ${dayOfMonth}`);
        } while (dayOfWeek !== 'Monday');
      }

      return `${dayOfWeek}, ${dayOfMonth} August ${year}`;
    });

    setGoodFriday(() => {
      let dayOfWeek = 'Sunday';
      let date = new Date(easterSunday);

      while (dayOfWeek !== 'Friday') {
        date.setDate(date.getDate() - 1);
        dayOfWeek = findDayOfWeek(date);

        if (dayOfWeek === 'Friday') break;
      }

      return `${dayOfWeek}, ${date.getDate()} ${date.toLocaleString('en-GB', {
        month: 'long',
      })} ${year}`;
    });

    setEasterMonday(() => {
      let dayOfWeek = 'Sunday';
      let date = new Date(easterSunday);

      while (dayOfWeek !== 'Monday') {
        date.setDate(date.getDate() + 1);
        dayOfWeek = findDayOfWeek(date);

        if (dayOfWeek === 'Monday') break;
      }

      return `${dayOfWeek}, ${date.getDate()} ${date.toLocaleString('en-GB', {
        month: 'long',
      })} ${year}`;
    });
  }

  function gaussAlgorithm(easterYear) {
    const A = easterYear % 19;
    const B = easterYear % 4;
    const C = easterYear % 7;
    const P = Math.floor(easterYear / 100.0);
    const Q = Math.floor((13 + 8 * P) / 25.0);
    const M = Math.floor(15 - Q + P - Math.floor(P / 4)) % 30;
    const N = Math.floor(4 + P - Math.floor(P / 4)) % 7;
    const D = Math.floor(19 * A + M) % 30;
    const E = Math.floor(2 * B + 4 * C + 6 * D + N) % 7;

    const days = Math.floor(21 + D + E);
    const easterSunday = new Date(`${easterYear}-3-1`);

    easterSunday.setDate(easterSunday.getDate() + days);

    return easterSunday;
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
        <h1>Bank Holidays for {year}:</h1>
        <br />
        <p>New Year's Day: {newYearDay}</p>
        <p>Early May Holiday: {earlyMayDay}</p>
        <p>Spring Holiday: {lateMayDay}</p>
        <p>Good Friday: {goodFriday}</p>
        <p>Easter Monday: {easterMonday}</p>
        <p>Summer Holiday: {summerDay}</p>
        <p>Christmas Day: {christmasDay}</p>
        <p>Boxing Day: {boxingDay}</p>
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
