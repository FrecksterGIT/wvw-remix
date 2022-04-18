import type { FC } from "react";
import type { IMatch, IObjective } from "~/models/interfaces.server";
import { Borderland } from "~/components/borderland";

interface WorldMapProps {
  match: IMatch;
  objectives: IObjective[];
}

export const WorldMap: FC<WorldMapProps> = ({ match, objectives }) => (
  <div className="relative h-[838px] w-[1200px] bg-world">
    <div className="absolute top-0 left-0 h-[50px] w-full bg-border" />
    <div className="absolute bottom-0 left-0 h-[50px] w-full rotate-180 bg-border" />
    {match.maps.map((map) => (
      <Borderland key={map.id} map={map} objectives={objectives} />
    ))}
  </div>
);
