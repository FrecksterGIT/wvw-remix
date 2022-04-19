import type { IMap, IObjective } from "~/models/interfaces.server";
import { BorderlandObjectives } from "~/components/borderland-objectives";

interface BorderlandProps {
  map: IMap;
  objectives: IObjective[];
}

export const Borderland = ({ map, objectives }: BorderlandProps) => {
  return (
    <>
      {map.id === 38 && (
        <div className="absolute left-[35.8%] top-[56.6%] w-[29%] before:block before:pb-[100%]">
          <BorderlandObjectives
            objectives={objectives}
            mapObjectives={map.objectives}
          />
        </div>
      )}
      {map.id === 95 && (
        <div className="absolute left-[2%] top-[38.1%] w-[29.5%] before:block before:pb-[100%]">
          <BorderlandObjectives
            objectives={objectives}
            mapObjectives={map.objectives}
          />
        </div>
      )}
      {map.id === 96 && (
        <div className="absolute left-[73.8%] top-[28.9%] w-[29.5%] before:block before:pb-[100%]">
          <BorderlandObjectives
            objectives={objectives}
            mapObjectives={map.objectives}
          />
        </div>
      )}
      {map.id === 1099 && (
        <div className="absolute left-[38%] top-0 w-[29.5%] before:block before:pb-[100%]">
          <BorderlandObjectives
            objectives={objectives}
            mapObjectives={map.objectives}
          />
        </div>
      )}
    </>
  );
};

/*
left: 35.8%;
    top: 56.6%;
    width: 29%;
 */
