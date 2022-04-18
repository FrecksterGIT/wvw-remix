import type { IMatch } from "~/models/interfaces.server";
import { useMemo } from "react";

interface IncomeProps {
  match: IMatch;
}

export const Income = ({ match }: IncomeProps) => {
  const incomes = useMemo(() => {
    return match.maps.reduce(
      (acc, map) => {
        const mapValues = map.objectives.reduce(
          (objAcc, obj) => {
            switch (obj.owner) {
              case "Red":
                objAcc.red += obj.points_tick;
                break;
              case "Blue":
                objAcc.blue += obj.points_tick;
                break;
              case "Green":
                objAcc.green += obj.points_tick;
                break;
            }
            return objAcc;
          },
          {
            red: 0,
            blue: 0,
            green: 0,
          }
        );

        acc.red += mapValues.red;
        acc.blue += mapValues.blue;
        acc.green += mapValues.green;

        return acc;
      },
      {
        red: 0,
        blue: 0,
        green: 0,
      }
    );
  }, [match.maps]);
  return (
    <>
      <p>Income</p>
      <ul>
        <li>{incomes.green}</li>
        <li>{incomes.blue}</li>
        <li>{incomes.red}</li>
      </ul>
    </>
  );
};
