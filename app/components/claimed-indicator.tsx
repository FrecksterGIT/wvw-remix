import type { IMatchObjective } from "~/models/interfaces.server";

interface ClaimedIndicatorProps {
  mapObjective: IMatchObjective;
}

export const ClaimedIndicator = ({ mapObjective }: ClaimedIndicatorProps) => {
  if (mapObjective.claimed_by) {
    return (
      <div
        className={`absolute bottom-[-2px] left-[-4px] h-[13px] w-[13px] bg-claimed bg-contain`}
      />
    );
  }
  return <></>;
};
