'use client';

import * as motion from 'motion/react-client';

export default function ToggleButton({ isOn, setIsOn }) {
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <button
      className="toggle-container"
      style={{
        ...container,
        justifyContent: isOn ? 'flex-start' : 'flex-end',
      }}
      onClick={toggleSwitch}
      aria-pressed={isOn}
      aria-label="Toggle floating animation"
    >
      <motion.div
        className="toggle-handle"
        style={handle}
        layout
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}

const container = {
  width: 50,
  height: 10,
  backgroundColor: '#222',
  borderRadius: 50,
  cursor: 'pointer',
  display: 'flex',
  padding: 1,
};

const handle = {
  width: 10,
  height: 10,
  backgroundColor: '#9911ff',
  borderRadius: '50%',
};
