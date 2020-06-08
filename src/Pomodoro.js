import React, { useState } from 'react';
import Session from './components/Session';
import Break from './components/Break';

const Pomodoro = () => {
  return (
    <div>
      <Session />
      <Break />
    </div>
  );
}

export default Pomodoro;