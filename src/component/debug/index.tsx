import React, { useState } from 'react';
import 'phaser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalReg } from '../../global-state';

const DebugPanel = () => {
  const [fps, setFps] = useState(0);
  const [version, setVersion] = useState('');
  const [counter, setCounter] = useState(0);

  useGlobalReg({
    setVersion,
    setFps,
    setCounter
  });

  return (
    <>
      <div
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span>Fps: {fps}</span>
        <br></br>
        <span>Version: {version}</span>
        <br></br>
        <span>Counter: {counter}</span>
      </div>
    </>
  );
};

export default DebugPanel;
