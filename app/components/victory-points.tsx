import { useMemo } from "react";
import type { IMatch } from "~/models/interfaces.server";

interface VictoryPointsProps {
  match: IMatch;
}

export const VictoryPoints = ({ match }: VictoryPointsProps) => {
  const diffs = useMemo(() => {
    const max = Math.max(...Object.values(match.victory_points));
    return {
      red: match.victory_points.red - max,
      blue: match.victory_points.blue - max,
      green: match.victory_points.green - max,
    };
  }, [match.victory_points]);

  return (
    <>
      <p>Victory Points</p>
      <ul>
        <li className="grid grid-cols-2">
          <span>{match.victory_points.green}</span>
          <span>{diffs.green || ""}</span>
        </li>
        <li className="grid grid-cols-2">
          <span>{match.victory_points.blue}</span>
          <span>{diffs.blue || ""}</span>
        </li>
        <li className="grid grid-cols-2">
          <span>{match.victory_points.red}</span>
          <span>{diffs.red || ""}</span>
        </li>
      </ul>
    </>
  );
};
