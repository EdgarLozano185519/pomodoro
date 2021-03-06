import React from 'react';

const Break = (props) => {
  return (
    <div id="break" role="region" aria-label="Break">
      <h2>Break Area</h2>
      <div id="break-label">Break Length</div>
      <div id="break-length">{props.minutes}</div>
      <button onClick={props.decrement} id="break-decrement">Decrement break timer by 1 Minute</button>
      <button onClick={props.increment} id="break-increment">Increment break timer by 1 minute</button>
    </div>
  );
}

export default Break;
