import React from 'react';

const ActiveTimer = (props) => {
  let timerString = "";
  if(props.active == "Session") {
    const secondsNumLength = props.sessionSeconds.toString().length;
    const minutesNumLength = props.sessionMinutes.toString().length;
    if(minutesNumLength===1) timerString = 0 + props.sessionMinutes + ":";
    else timerString = props.sessionMinutes + ":";
    if(secondsNumLength===1) timerString += 0 + props.sessionSeconds;
    else timerString += props.sessionSeconds;
  }
  else {
    const secondsNumLength = props.breakSeconds.toString().length;
    const minutesNumLength = props.breakMinutes.toString().length;
    if(minutesNumLength===1) timerString = 0 + props.breakMinutes + ":";
    else timerString = props.breakMinutes + ":";
    if(secondsNumLength===1) timerString += 0 + props.breakSeconds;
    else timerString += props.breakSeconds;
  }
  return (
    <div role="region" aria-label="Active-Timer" id="active-timer">
      <h2>Active Timer</h2>
      <div id="timer-label">{props.active}</div>
      <h2>Time Left</h2>
      <div id="time-left">{timerString}</div>
    </div>
  );
}

export default ActiveTimer;