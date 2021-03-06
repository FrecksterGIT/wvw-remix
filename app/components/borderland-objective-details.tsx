import { useMemo } from "react";
import type { IMatchObjective, IObjective } from "~/models/interfaces.server";
import { TimerSince } from "~/components/timer-since";
import { GuildName } from "~/components/guild-name";
import { GuildEmblem } from "~/components/guild-emblem";

interface BorderlandObjectiveDetailsProps {
  mapObjective: IMatchObjective;
  objective: IObjective;
  showDetails: boolean;
}

export const BorderlandObjectiveDetails = ({
  mapObjective,
  objective,
  showDetails,
}: BorderlandObjectiveDetailsProps) => {
  const yaks = useMemo(() => {
    if (mapObjective.yaks_delivered) {
      if (mapObjective.yaks_delivered === 140) {
        return "";
      }
      if (mapObjective.yaks_delivered >= 60) {
        return `${mapObjective.yaks_delivered - 60} / 80`;
      }
      if (mapObjective.yaks_delivered >= 20) {
        return `${mapObjective.yaks_delivered - 20} / 40`;
      }
    }
    return `${mapObjective.yaks_delivered} / 20`;
  }, [mapObjective.yaks_delivered]);

  return (
    <div
      className={`absolute top-0 left-[40px] z-10 w-[230px] bg-[#000] px-[11px] py-[6px] pl-[70px] text-white ${
        showDetails ? "" : "hidden"
      }`}
    >
      <div className="absolute left-[10px] top-[10px]">
        {mapObjective.claimed_by && (
          <GuildEmblem guildId={mapObjective.claimed_by} />
        )}
      </div>
      <div className="text-center font-medium">{objective.name}</div>
      <div className="grid grid-cols-2">
        <span className="col-span-1">Turned</span>
        <span className="col-span-1">
          {showDetails && <TimerSince time={mapObjective.last_flipped} />}
        </span>
        {mapObjective.claimed_at && mapObjective.claimed_by && (
          <>
            <span className="col-span-1">Guild</span>
            <span className="col-span-1">
              <GuildName guildId={mapObjective.claimed_by} />
            </span>
            <span className="col-span-1">Claimed</span>
            <span className="col-span-1">
              {showDetails && <TimerSince time={mapObjective.claimed_at} />}
            </span>
          </>
        )}
        {yaks && (
          <>
            <span className="col-span-1">Dolyaks</span>
            <span className="col-span-1">{yaks}</span>
          </>
        )}
        <span className="col-span-1">Points</span>
        <span className="col-span-1">{mapObjective.points_capture}</span>
        <span className="col-span-1">Tick</span>
        <span className="col-span-1">{mapObjective.points_tick}</span>
      </div>
    </div>
  );
};
