import type { IMatchObjective, IObjective } from "~/models/interfaces.server";
import { useMemo, useState } from "react";
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

  return (
    <>
      {showObjective && (
        <div
          title={objective?.name}
          className={`relative inline-block h-[26px] w-[26px] rounded-full bg-owner-${mapObjective.owner.toLowerCase()}`}
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
