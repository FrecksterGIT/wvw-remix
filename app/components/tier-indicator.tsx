import { useTier } from "~/hooks/use-tier";
import type { IMatchObjective } from "~/models/interfaces.server";

interface TierIndicatorProps {
  mapObjective: IMatchObjective;
}

export const TierIndicator = ({ mapObjective }: TierIndicatorProps) => {
  const tier = useTier(mapObjective.yaks_delivered);

  return (
    <div
      className={`absolute bg-tier${tier} top-[-5px] left-[1px] h-[12px] w-[24px] bg-contain`}
    />
  );
};
