import { useStopwatch } from "react-timer-hook";
import { useCallback, useEffect, useMemo } from "react";
import { differenceInSeconds } from "date-fns";

interface TimerSinceProps {
  time: Date;
}

export const TimerSince = ({ time }: TimerSinceProps) => {
  const offset = useMemo(() => {
    const _offset = new Date();
    _offset.setSeconds(
      _offset.getSeconds() + differenceInSeconds(new Date(), new Date(time))
    );
    return _offset;
  }, [time]);

  const { seconds, minutes, hours, days, reset } = useStopwatch({
    offsetTimestamp: offset,
    autoStart: true,
  });

  useEffect(() => {
    const _offset = new Date();
    _offset.setSeconds(
      _offset.getSeconds() + differenceInSeconds(new Date(), new Date(time))
    );

    reset(_offset, true);
  }, [time]);

  const number = useCallback(
    (number: number, suffix: string, dontCheck = false) =>
      number > 0 || dontCheck
        ? `${String(number).padStart(2, "0")}${suffix}`
        : "",
    []
  );

  if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
    return (
      <div className="top-[26px] text-white">
        {number(days, "d")} {number(hours, "h")} {number(minutes, "m")}{" "}
        {number(seconds, "s", true)}
      </div>
    );
  }

  return <></>;
};
