'use client';

import React from 'react';
import CountUp from 'react-countup';

export interface CounterProps {
  value: number | undefined;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  delay?: number;
}

export const Counter = ({ value, prefix, suffix, ...rest }: CounterProps) => {
  if (!value) return null;

  return (
    <>
      {prefix}
      <CountUp
        enableScrollSpy
        preserveValue
        duration={0.5}
        end={value}
        formattingFn={(val) => val.toLocaleString('en-US')}
        startVal={value / 2}
        {...rest}
      />
      {suffix}
    </>
  );
};
