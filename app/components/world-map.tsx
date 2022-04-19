import type { FC } from "react";
import type { IMatch, IObjective } from "~/models/interfaces.server";
import { Borderland } from "~/components/borderland";

interface WorldMapProps {
  match: IMatch;
  objectives: IObjective[];
}

export const WorldMap: FC<WorldMapProps> = ({ match, objectives }) => (
  <div className="relative h-[838px] w-[1200px] bg-world before:absolute before:top-0 before:left-0 before:block before:h-[50px] before:w-full before:bg-border after:absolute after:bottom-0 after:left-0 after:h-[50px] after:w-full after:rotate-180 after:bg-border">
    {match.maps.map((map) => (
      <Borderland key={map.id} map={map} objectives={objectives} />
    ))}
  </div>
);
