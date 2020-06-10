import React from 'react';

const ActiveTimer = (props) => {
  let timerString = "";
  if(props.active === "Session") {
    if(props.sessionMinutes<10) timerString = "0" + props.sessionMinutes + ":";
    else timerString = props.sessionMinutes + ":";
    if(props.sessionSeconds<10) timerString += "0" + props.sessionSeconds;
    else timerString += props.sessionSeconds;
  }
  else {
    if(props.breakMinutes<10) timerString = "0" + props.breakMinutes + ":";
    else timerString = props.breakMinutes + ":";
    if(props.breakSeconds<10) timerString += "0" + props.breakSeconds;
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