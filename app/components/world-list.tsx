import type {
  IColorsWithNumbers,
  IMatchOverview,
  IWorld,
} from "~/models/interfaces.server";
import { useCallback } from "react";

interface WorldListProps {
  match: IMatchOverview;
  worlds: IWorld[];
  color: keyof IColorsWithNumbers;
}

export const WorldList = ({ match, worlds, color }: WorldListProps) => {
  const worldName = useCallback(
    (worldId: number, worlds: IWorld[]): string =>
      worlds.find((world) => world.id === worldId)?.name ?? "",
    []
  );

  return (
    <span className={`text-${color}`}>
      <span className="mr-1 font-bold">
        {worldName(match.worlds[color], worlds)}
      </span>
      {match.all_worlds[color].map((allWorld) =>
        allWorld !== match.worlds[color] ? (
          <span key={allWorld} className="mr-1">
            {worldName(allWorld, worlds)}
          </span>
        ) : (
          ""
        )
      )}
    </span>
  );
};
