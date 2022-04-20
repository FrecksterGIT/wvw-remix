import { useMemo, useState } from "react";
import type { IMatchObjective, IObjective } from "~/models/interfaces.server";
import { Camp } from "~/components/svgs/camp";
import { Tower } from "~/components/svgs/tower";
import { Keep } from "~/components/svgs/keep";
import { Castle } from "~/components/svgs/castle";
import { TurnTimer } from "~/components/timer";
import { BorderlandObjectiveDetails } from "~/components/borderland-objective-details";

interface BorderlandObjectiveProps {
  objectives: IObjective[];
  mapObjective: IMatchObjective;
}

export const BorderlandObjective = ({
  objectives,
  mapObjective,
}: BorderlandObjectiveProps) => {
  const MAP_SIZES = useMemo(() => ({
    38: [
      [8958, 12798],
      [12030, 15870],
    ],
    95: [
      [5630, 11518],
      [8702, 14590],
    ],
    96: [
      [12798, 10878],
      [15870, 13950],
    ],
    1099: [
      [9214, 8958],
      [12286, 12030],
    ],
  }), []);

  const objective = useMemo(
    () => objectives.find((obj) => obj.id === mapObjective.id),
    [mapObjective.id, objectives]
  );
  const Svg = useMemo(() => {
    switch (objective?.type) {
      case "Camp":
        return Camp;
      case "Tower":
        return Tower;
      case "Keep":
        return Keep;
      case "Castle":
        return Castle;
    }
    // eslint-disable-next-line react/display-name
    return () => <></>;
  }, [objective?.type]);

  const showObjective = useMemo(
    () =>
      objective?.type &&
      ["Camp", "Tower", "Keep", "Castle"].includes(objective.type),
    [objective?.type]
  );

  const [showDetails, setShowDetails] = useState(false);

  const coords = useMemo(() => {
    if (objective) {
      const map = MAP_SIZES[objective.map_id];
      if (map) {
        const mapSize = [map[1][0] - map[0][0], map[1][1] - map[0][1]];
        const point = objective.coord;
        if (point) {
          const coord = [point[0] - map[0][0], point[1] - map[0][1]];
          return [(coord[0] / mapSize[0]) * 100, (coord[1] / mapSize[1]) * 100];
        }
      }
    }
    return [0, 0];
  }, [MAP_SIZES, objective]);

  return (
    <>
      {showObjective && (
        <div
          className={`absolute inline-block h-[26px] w-[26px] rounded-full bg-owner-${mapObjective.owner.toLowerCase()}`}
          style={{
            top: `calc(${coords[1]}% - 13px)`,
            left: `calc(${coords[0]}% - 13px)`,
          }}
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <Svg />
          <TurnTimer time={mapObjective.last_flipped} />
          {showDetails && objective && (
            <BorderlandObjectiveDetails
              objective={objective}
              mapObjective={mapObjective}
            />
          )}
        </div>
      )}
    </>
  );
};
