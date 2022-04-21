import type { IMatch, ISkirmish } from "~/models/interfaces.server";
import { useMemo } from "react";

interface CurrentPointsProps {
  match: IMatch;
}

export const CurrentPoints = ({ match }: CurrentPointsProps) => {
  const currentSkirmish = useMemo(() => {
    return match.skirmishes.reduce<ISkirmish | null>((skirmish, current) => {
      return (skirmish?.id ?? 0) < current.id ? current : skirmish;
    }, null);
  }, [match.skirmishes]);

  const maxScore = useMemo(() => {
    if (currentSkirmish?.scores) {
      return Math.max(...Object.values(currentSkirmish.scores));
    }
    return 0;
  }, [currentSkirmish?.scores]);

  return (
    <>
      {currentSkirmish?.scores && (
        <>
          <p>Points</p>
          <ul>
            <li>
              <Points
                points={currentSkirmish.scores.green}
                maxScore={maxScore}
                color="green"
              />
            </li>
            <li>
              <Points
                points={currentSkirmish.scores.blue}
                maxScore={maxScore}
                color="blue"
              />
            </li>
            <li>
              <Points
                points={currentSkirmish.scores.red}
                maxScore={maxScore}
                color="red"
              />
            </li>
          </ul>
        </>
      )}
    </>
  );
};

interface PointsProps {
  points: number;
  maxScore: number;
  color: "green" | "blue" | "red";
}

const Points = ({ points, maxScore, color }: PointsProps) => {
  return (
    <>
      <span>{points}</span>
      <span className="ml-5 inline-block h-[8px] w-[100px]">
        <span
          className={`bg-${color} inline-block h-full rounded`}
          style={{
            width: `${(points / maxScore) * 100}%`,
          }}
        ></span>
      </span>
    </>
  );
};
