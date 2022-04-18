import type { IMatchObjective, IObjective } from "~/models/interfaces.server";
import { BorderlandObjective } from "~/components/borderland-objective";

interface BorderlandObjectivesProps {
  mapObjectives: IMatchObjective[];
  objectives: IObjective[];
}

export const BorderlandObjectives = ({
  mapObjectives,
  objectives,
}: BorderlandObjectivesProps) => {
  return (
    <>
      {mapObjectives.map((obj) => (
        <BorderlandObjective
          key={obj.id}
          objectives={objectives}
          mapObjective={obj}
        />
      ))}
    </>
  );
};
