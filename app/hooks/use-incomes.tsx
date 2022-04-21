import { useMemo } from "react";
import type { IMap } from "~/models/interfaces.server";

export const useIncomes = (maps: IMap[]) => {
  return useMemo(() => {
    return maps.reduce(
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
  }, [maps]);
};
