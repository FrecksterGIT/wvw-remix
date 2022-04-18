import type { IMatch } from "~/models/interfaces.server";
import { useMemo } from "react";

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
        <li>
          {match.victory_points.green} {diffs.green || ""}
        </li>
        <li>
          {match.victory_points.blue} {diffs.blue || ""}
        </li>
        <li>
          {match.victory_points.red} {diffs.red || ""}
        </li>
      </ul>
    </>
  );
};
