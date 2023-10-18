import './App.css';
import { GiSparrow } from "react-icons/gi"
import { useState, useEffect } from "react"
import alarmSound from "./assets/beep.wav"
import TimeSetter from './TimeSetter';
import Display from './Display';

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${seconds < 10 ? "0" + seconds.toString() : seconds}`
}

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false
  });

  useEffect(() => {
    let timerID;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID)
    }
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep");
      audio.currentTime = 1;
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        time: prev.timeType === "Session" ? breakTime : sessionTime,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
      }))
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  }

  const changeBreakTime = (time) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  }

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }))
  }

  const changeSessionTime = (time) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  }
  return (
    <>
      <div className='container'>
        <div className="clock">
          <div className="piece"></div>
          <div className="piece"></div>
          <div className="piece"></div>
          <div className="piece"></div>
          <div className="title">
            <GiSparrow size={35} />
            <h2>25 + 5 Clock</h2>
          </div>
          <div className="lengths">
            <div>
              <h3>Break Length</h3>
              <TimeSetter
                time={breakTime}
                setTime={changeBreakTime}
                min={min}
                max={max}
                interval={interval}
              />
            </div>
            <div>
              <h3>Session Length</h3>
              <span>
                <TimeSetter
                  time={sessionTime}
                  setTime={changeSessionTime}
                  min={min}
                  max={max}
                  interval={interval}
                />
              </span>
            </div>
          </div>
          <div>
            <Display
              displayState={displayState}
              reset={reset}
              startStop={startStop}
              formatTime={formatTime}
            />
          </div>
          <audio id="beep" src={alarmSound} />
        </div>
      </div>
      <div className="attribution"><h4>Coded by <a href="https://github.com/KangFennex" target="_blank" rel="noreferrer">Kangkm</a></h4></div>
    </>
  )
}

export default App
