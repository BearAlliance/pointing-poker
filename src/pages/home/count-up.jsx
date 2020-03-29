import React, { useState, useEffect } from 'react';

export function CountUp({ countTo }) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    if (Number(countTo) > currentCount) {
      setTimeout(() => {
        setCurrentCount(currentCount + 1);
      }, 2);
    }
  });

  return <span>{currentCount}</span>;
}
