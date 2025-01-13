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

    setYear(year);

    let newYearDayOfMonth = 1;
    let newYearDayOfWeek = findDayOfWeek(
      `${year} January ${newYearDayOfMonth}`
    );

    if (newYearDayOfWeek === 'Saturday' || newYearDayOfWeek === 'Sunday') {
      newYearDayOfWeek === 'Saturday'
        ? (newYearDayOfMonth += 2)
        : (newYearDayOfMonth += 1);

      newYearDayOfWeek = findDayOfWeek(`${year} January ${newYearDayOfMonth}`);
    }

    setNewYearDay(
      `${newYearDayOfWeek}, ${newYearDayOfMonth} January ${year} ${
        newYearDayOfMonth > 1 ? '(Substitute Holiday)' : ''
      }`
    );

    let christmasDayOfMonth = 25;
    let christmasDayOfWeek = findDayOfWeek(
      `${year} December ${christmasDayOfMonth}`
    );
    let boxingDayOfMonth = 26;
    let boxingDayOfWeek = findDayOfWeek(`${year} December ${boxingDayOfMonth}`);

    if (christmasDayOfWeek === 'Saturday' || christmasDayOfWeek === 'Sunday') {
      christmasDayOfWeek === 'Saturday'
        ? (christmasDayOfMonth += 2)
        : (christmasDayOfMonth += 1);

      if (christmasDayOfMonth === 26) christmasDayOfMonth += 1;

      christmasDayOfWeek = findDayOfWeek(
        `${year} December ${christmasDayOfMonth}`
      );
    }

    if (boxingDayOfWeek === 'Saturday' || boxingDayOfWeek === 'Sunday') {
      boxingDayOfWeek === 'Saturday'
        ? (boxingDayOfMonth += 2)
        : (boxingDayOfMonth += 1);

      if (boxingDayOfMonth === christmasDayOfMonth) boxingDayOfMonth += 1;

      boxingDayOfWeek = findDayOfWeek(`${year} December ${boxingDayOfMonth}`);
    }

    setChristmasDay(
      `${christmasDayOfWeek}, ${christmasDayOfMonth} December ${year} ${
        christmasDayOfMonth > 25 ? '(Substitute Holiday)' : ''
      }`
    );

    setBoxingDay(
      `${boxingDayOfWeek}, ${boxingDayOfMonth} December ${year} ${
        boxingDayOfMonth > 26 ? '(Substitute Holiday)' : ''
      }`
    );

    let earlyMayDayOfMonth = 1;
    let earlyMayDayOfWeek = findDayOfWeek(`${year} May ${earlyMayDayOfMonth}`);

    while (earlyMayDayOfWeek !== 'Monday') {
      earlyMayDayOfMonth++;
      earlyMayDayOfWeek = findDayOfWeek(`${year} May ${earlyMayDayOfMonth}`);
    }

    setEarlyMayDay(`${earlyMayDayOfWeek}, ${earlyMayDayOfMonth} May ${year}`);

    let lateMayDayOfMonth = 31;
    let lateMayDayOfWeek = findDayOfWeek(`${year} May ${lateMayDayOfMonth}`);

    while (lateMayDayOfWeek !== 'Monday') {
      lateMayDayOfMonth--;
      lateMayDayOfWeek = findDayOfWeek(`${year} May ${lateMayDayOfMonth}`);
    }

    setLateMayDay(`${lateMayDayOfWeek}, ${lateMayDayOfMonth} May ${year}`);

    let augustLastMondayOfMonth = 31;
    let augustLastMondayDayOfWeek = findDayOfWeek(
      `${year} August ${augustLastMondayOfMonth}`
    );

    while (augustLastMondayDayOfWeek !== 'Monday') {
      augustLastMondayOfMonth--;
      augustLastMondayDayOfWeek = findDayOfWeek(
        `${year} August ${augustLastMondayOfMonth}`
      );
    }

    setSummerDay(
      `${augustLastMondayDayOfWeek}, ${augustLastMondayOfMonth} August ${year}`
    );

    const easterSunday = gaussAlgorithm(year);
    let goodFridayDate = new Date(easterSunday);
    let easterMondayDate = new Date(easterSunday);

    while (
      goodFridayDate.toLocaleString('en-GB', { weekday: 'long' }) !== 'Friday'
    ) {
      goodFridayDate.setDate(goodFridayDate.getDate() - 1);
    }

    setGoodFriday(
      goodFridayDate.toLocaleString('en-GB', { dateStyle: 'full' })
    );

    while (
      easterMondayDate.toLocaleString('en-GB', { weekday: 'long' }) !== 'Monday'
    ) {
      easterMondayDate.setDate(easterMondayDate.getDate() + 1);
    }

    setEasterMonday(
      easterMondayDate.toLocaleString('en-GB', {
        dateStyle: 'full',
      })
    );
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
