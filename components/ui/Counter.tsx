import React from 'react';
import CountUp, { type CountUpProps } from 'react-countup';

export interface CounterProps extends Omit<CountUpProps, 'prefix' | 'suffix' | 'end'> {
  value: number | undefined;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  delay?: number;
}

/**
 * Animated counter
 * @param value
 * @param prefix - e.g. "$"
 * @param suffix - e.g. "M"
 * @param rest - compatible CountUp props
 * @constructor
 */
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
