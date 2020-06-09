import React from 'react';

const Session = (props) => {
  return (
    <div id="session" role="region" aria-label="Session">
      <h2>Session Area</h2>
      <div id="session-label">Session Length</div>
      <div id="session-length">{props.minutes}</div>
      <button onClick={props.decrement} id="session-decrement">Decrement session timer by 1 Minute</button>
      <button onClick={props.increment} id="session-increment">Increment session timer by 1 minute</button>
    </div>
  );
}

export default Session;
