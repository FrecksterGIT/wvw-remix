import { useCallback, useMemo } from "react";
import type { IMatch, IObjective, IWorld } from "~/models/interfaces.server";

interface MatchLogProps {
  match: IMatch;
  worlds: IWorld[];
  objectives: IObjective[];
}

interface LogEntry {
  id: string;
  time: Date;
  formattedTime: string;
  what: string;
  from?: string;
  fromColor?: "red" | "blue" | "green" | "gray";
  to: string;
  toColor: "red" | "blue" | "green" | "gray";
}

export const MatchLog = ({ match, worlds, objectives }: MatchLogProps) => {
  const getWorld = useCallback(
    (color: string) => {
      if (color === "Red") {
        return worlds.find((w) => w.id === match.worlds.red)?.name;
      }
      if (color === "Blue") {
        return worlds.find((w) => w.id === match.worlds.blue)?.name;
      }
      if (color === "Green") {
        return worlds.find((w) => w.id === match.worlds.green)?.name;
      }
    },
    [match.worlds.blue, match.worlds.green, match.worlds.red, worlds]
  );
  const getColor = useCallback((color: string) => {
    if (color === "Red") {
      return "red";
    }
    if (color === "Blue") {
      return "blue";
    }
    if (color === "Green") {
      return "green";
    }
    return "gray";
  }, []);

  const getObjective = useCallback(
    (id: string) => {
      return objectives.find((obj) => obj.id === id)?.name ?? "";
    },
    [objectives]
  );

  const logEntries = useMemo(() => {
    const entries = match.maps.reduce<LogEntry[]>((acc, map) => {
      return [
        ...acc,
        ...map.objectives.reduce<LogEntry[]>((objAcc, obj) => {
          if (["Camp", "Tower", "Keep", "Castle"].includes(obj.type)) {
            objAcc.push({
              id: `${map.id}-${obj.id}`,
              what: getObjective(obj.id),
              to: getWorld(obj.owner) ?? "",
              toColor: getColor(obj.owner),
              time: new Date(obj.last_flipped),
              formattedTime: new Date(obj.last_flipped).toLocaleTimeString(),
            });
          }
          return objAcc;
        }, []),
      ];
    }, []);

    return entries.sort((a, b) =>
      a.time.getTime() > b.time.getTime() ? -1 : 1
    );
  }, [getColor, getObjective, getWorld, match.maps]);

  return (
    <div className="h-[5em] overflow-y-scroll">
      {logEntries.map(
        ({ id, what, time, formattedTime, to, toColor, from }) => (
          <div key={`${id}-${time}`}>
            {formattedTime}:{" "}
            <span className={`text-${toColor} font-medium`}>{what}</span>{" "}
            captured by{" "}
            <span className={`text-${toColor} font-medium`}>{to}</span>
          </div>
        )
      )}
    </div>
  );
};
