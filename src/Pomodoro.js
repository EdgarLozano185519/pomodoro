import React, { useState, useEffect, useRef } from 'react';
import Session from './components/Session';
import Break from './components/Break';
import ActiveTimer from './components/ActiveTimer';

const Pomodoro = () => {
  const [ breakMinutes, setBreakMinutes ] = useState(5);
  const [ breakSeconds, setBreakSeconds ] = useState(0);
  const [ sessionMinutes, setSessionMinutes ] = useState(25);
  const [ sessionSeconds, setSessionSeconds ] = useState(0);
  const [ active, setActive ] = useState("Session");
  const [ paused, setPaused ] = useState(true);
  useEffect(() => {
    let interval = null;
    if(!paused) interval = setInterval(()=>{
      if(active==="Session" && sessionSeconds>0) setSessionSeconds(sessionSeconds => sessionSeconds-1);
      else if(active==="Session" && sessionSeconds===0 && sessionMinutes>0) {
        setSessionSeconds(sessionSeconds => 0);
        setSessionMinutes(sessionMinutes => sessionMinutes-1);
        setSessionSeconds(sessionSeconds => 59);
      }
      else if(active==="Break" && breakSeconds>0) setBreakSeconds(breakSeconds => breakSeconds-1);
      else if(active==="Break" && breakSeconds===0 && breakMinutes>0) {
        setBreakSeconds(breakSeconds => 0);
        setBreakMinutes(sessionMinutes => sessionMinutes-1);
        setBreakSeconds(breakSeconds => 59);
      }
    },1000);
    return () => interval !== null ? clearInterval(interval) : 0;
  }, [ paused, sessionMinutes, sessionSeconds, active, breakSeconds, breakMinutes ]);
  const breakDecrement = () => {
    if(breakMinutes > 1) setBreakMinutes( breakMinutes => breakMinutes-1 );
  };
  const breakIncrement = () => {
    if(breakMinutes < 60) setBreakMinutes(breakMinutes => breakMinutes+1 );
  };
  const sessionDecrement = () => {
    if(sessionMinutes > 1) setSessionMinutes(sessionMinutes => sessionMinutes-1 );
  };
  const sessionIncrement = () => {
    if(sessionMinutes < 60) setSessionMinutes(sessionMinutes => sessionMinutes+1 );
  };
  const reset = () => {
    setBreakMinutes(breakMinutes => 5);
    setBreakSeconds(breakSeconds => 0);
    setSessionMinutes(sessionMinutes => 25);
    setSessionSeconds(sessionSeconds => 0);
    setPaused(paused => true);
    setActive(active => "Session");
    let audioElement = document.getElementById("beep");
    audioElement.pause();
    if(audioElement.currentTime>0) audioElement.currentTime=0;
  }
  const timer = () => {
    if(paused) setPaused(false);
    else setPaused(true);
  }
  if(active==="Session" && sessionMinutes===0 && sessionSeconds===0) {
    setActive(active => "Break");
    setBreakMinutes(breakMinutes => 5);
    setBreakSeconds(breakSeconds => 0);
  }
  else if(active==="Break" && breakMinutes===0 && breakSeconds===0) {
    setActive(active => "Session");
    setSessionSeconds(sessionSeconds =>0);
    setSessionMinutes(sessionMinutes => 25);
  }
  let audioRef = useRef(null);
  if(audioRef.current && active==="Session" && sessionMinutes===0 && sessionSeconds===0) audioRef.current.play();
  else if(audioRef.current && active==="Break" && breakMinutes===0 && breakSeconds===0) audioRef.current.play();
  return (
    <div id="pomodoro">
      <Session
        increment={sessionIncrement}
        decrement={sessionDecrement}
        seconds={sessionSeconds}
        minutes={sessionMinutes}
      />
      <Break
        increment={breakIncrement}
        decrement={breakDecrement}
        seconds={breakSeconds}
        minutes={breakMinutes}
      />
      <ActiveTimer
        breakSeconds={breakSeconds}
        breakMinutes={breakMinutes}
        sessionSeconds={sessionSeconds}
        sessionMinutes={sessionMinutes}
        active={active}
      />
      <div role="region" aria-label="controls" id="controls">
        <h2>Controls</h2>
        <audio id="beep" ref={audioRef}>
          <source src="https://www.dropbox.com/s/6gz7v9e4u51ubin/beep.mp3?raw=1"></source>
        </audio>
        <div id="button-container"><button onClick={timer} id="start_stop">Start/Stop</button></div>
        <div id="button-container"><button onClick={reset} id="reset">Reset</button></div>
      </div>
    </div>
  );
}

export default Pomodoro;