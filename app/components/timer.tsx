import { add } from "date-fns";
import { useTimer } from "react-timer-hook";
import { useCallback, useEffect } from "react";

interface TimerProps {
  time: Date;
}

export const TurnTimer = ({ time }: TimerProps) => {
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: add(new Date(time), { seconds: 300 }),
  });

  useEffect(() => {
    restart(add(new Date(time), { seconds: 300 }));
  }, [time]);

  const number = useCallback(
    (number: number) => String(number).padStart(2, "0"),
    []
  );

  if (minutes > 0 || seconds > 0) {
    return (
      <div className="top-[26px] text-white">
        {number(minutes)}:{number(seconds)}
      </div>
    );
  }

  return <></>;
};
