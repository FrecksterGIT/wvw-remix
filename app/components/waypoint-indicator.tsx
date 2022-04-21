import { useTier } from "~/hooks/use-tier";
import type { IMatchObjective } from "~/models/interfaces.server";

interface WaypointIndicatorProps {
  mapObjective: IMatchObjective;
}

export const WaypointIndicator = ({ mapObjective }: WaypointIndicatorProps) => {
  const tier = useTier(mapObjective.yaks_delivered);

  if (tier === 3 && ["Castle", "Keep"].includes(mapObjective.type)) {
    return (
      <div
        className={`absolute bottom-[-5px] right-[-7px] h-[18px] w-[18px] bg-waypoint bg-contain`}
      />
    );
  }
  return <></>;
};
