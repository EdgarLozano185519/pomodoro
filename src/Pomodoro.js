import React, { useState } from 'react';
import Session from './components/Session';
import Break from './components/Break';
import ActiveTimer from './components/ActiveTimer';

const Pomodoro = () => {
  const [ breakMinutes, setBreakMinutes ] = useState(5);
  const [ breakSeconds, setBreakSeconds ] = useState(0);
  const [ sessionMinutes, setSessionMinutes ] = useState(25);
  const [ sessionSeconds, setSessionSeconds ] = useState(0);
  const [ active, setActive ] = useState("Session");
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
    if(sessionMinutes < 5) setSessionMinutes( sessionMinutes+1 );
  };
  return (
    <div id="pomodoro">
      <Session increment={sessionIncrement} decrement={sessionDecrement} seconds={sessionSeconds} minutes={sessionMinutes} />
      <Break increment={breakIncrement} decrement={breakDecrement} seconds={breakSeconds} minutes={breakMinutes} />
      <ActiveTimer
        breakSeconds={breakSeconds}
        breakMinutes={breakMinutes}
        sessionSeconds={sessionSeconds}
        sessionMinutes={sessionMinutes}
        active={active}
      />
      <div id="controls">
      </div>
    </div>
  );
}

export default Pomodoro;