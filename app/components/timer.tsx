import { useCallback, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { add } from "date-fns";

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
      <div
        className="top-[26px] text-white"
        style={{
          textShadow:
            "0 -1px #000000, 1px 0 #000000, 0 1px #000000, -1px 0 #000000, 0 -1px 2px #000000, 1px 0 2px #000000, 0 1px 2px #000000, -1px 0 2px #000000, 0 -1px 2px #000000, 1px 0 2px #000000, 0 1px 2px #000000, -1px 0 2px #000000",
        }}
      >
        {number(minutes)}:{number(seconds)}
      </div>
    );
  }

  return <></>;
};
