"use client";

import { useEffect, useReducer } from "react";
import { formatTimerFromNow } from "~/lib/dateUtils";

export const CountDownTimer = ({ endTime }: { endTime: Date }) => {
  const [, update] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 1000);
    return () => clearInterval(interval);
  }, [update]);
  return (
    <div className="text-lg font-bold tracking-widest">
      <div>Ends in:</div>
      <div suppressHydrationWarning>{formatTimerFromNow(endTime)}</div>
    </div>
  );
};
