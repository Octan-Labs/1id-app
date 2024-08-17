"use client";

import { useEffect, useReducer } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";

export const CountDownTimer = ({
  startTime,
  endTime,
}: {
  startTime: Date;
  endTime: Date;
}) => {
  const [, update] = useReducer((x) => x + 1, 0);
  const now = new Date();
  const distanceFromNow = formatDistanceToNowStrict(
    now < startTime ? startTime : endTime,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 1000);
    return () => clearInterval(interval);
  }, [update]);
  return (
    <div className="text-lg font-bold tracking-widest">
      <div>
        Duration: {format(startTime, "dd/MM/yyyy hh:mm")} -{" "}
        {format(endTime, "dd/MM/yyyy hh:mm")}
      </div>
      <div suppressHydrationWarning>
        {now < startTime ? "Starts in" : "Ends in"}: {distanceFromNow}
      </div>
    </div>
  );
};
