import React, { useState, useRef } from 'react';
 
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);
 
  const startStopwatch = () => {
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
  };
 
  const stopStopwatch = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };
 
  const resetStopwatch = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
  };
 
  const lapStopwatch = () => {
    setLaps([...laps, time]);
  };
 
  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
 
    return `${getMinutes}:${getSeconds}.${getMilliseconds}`;
  };
 
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Stopwatch</h1>
      <div>
        <h2>{formatTime(time)}</h2>
      </div>
      <div>
        {isActive
          ? <button onClick={stopStopwatch}>Stop</button>
          : <button onClick={startStopwatch}>Start</button>}
        <button onClick={lapStopwatch}>Lap</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
      <h2>Laps</h2>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};
 
export default Stopwatch;
 