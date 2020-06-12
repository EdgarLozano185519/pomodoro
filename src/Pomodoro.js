import React, { useState, useEffect } from 'react';
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
        setSessionSeconds(59);
        setSessionMinutes(sessionMinutes => sessionMinutes-1);
      }
    },1000);
    return () => interval !== null ? clearInterval(interval) : 0;
  }, [ paused, sessionMinutes, sessionSeconds, active, breakSeconds, breakMinutes ]);
  const breakDecrement = () => {
    if(breakMinutes > 0) setBreakMinutes( breakMinutes-1 );
  };
  const breakIncrement = () => {
    if(breakMinutes < 60) setBreakMinutes( breakMinutes+1 );
  };
  const sessionDecrement = () => {
    if(sessionMinutes > 0) setSessionMinutes( sessionMinutes-1 );
  };
  const sessionIncrement = () => {
    if(sessionMinutes < 60) setSessionMinutes( sessionMinutes+1 );
  };
  const reset = () => {
    setBreakMinutes(5);
    setBreakSeconds(0);
    setSessionMinutes(25);
    setSessionSeconds(0);
    setActive("Session");
  }
  const timer = () => {
    if(paused) setPaused(false);
    else setPaused(true);
  }
  if(active==="Session" && sessionMinutes===0 && sessionSeconds===0) {
    setActive("Break");
    setSessionMinutes(25);
    setSessionSeconds(0);
  }
  else if(active==="Break" && breakSeconds===0 && breakSeconds===0) {
    setActive("Session");
    setBreakSeconds(0);
    setBreakMinutes(5);
  }
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
        <div id="button-container"><button onClick={timer} id="start_stop">Start/Stop</button></div>
        <div id="button-container"><button onClick={reset} id="reset">Reset</button></div>
      </div>
    </div>
  );
}

export default Pomodoro;