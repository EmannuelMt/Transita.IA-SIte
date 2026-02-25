import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ start = 0, end = 100, duration = 1500, decimals = 0, prefix = '', suffix = '' }) => {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const diff = end - start;

    const tick = (now) => {
      const elapsed = Math.min(now - startTime, duration);
      const progress = duration === 0 ? 1 : elapsed / duration;
      const current = start + diff * progress;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, end, duration, decimals]);

  return (
    <>{prefix}{value}{suffix}</>
  );
};

export default CountUp;
