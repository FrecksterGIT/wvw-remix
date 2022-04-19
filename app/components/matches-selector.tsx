import { Link } from "@remix-run/react";
import type {
  IMatch,
  IMatchOverview,
  IWorld,
  IColorsWithNumbers,
} from "~/models/interfaces.server";

interface MatchesSelectorProps {
  matches: IMatchOverview[];
  worlds: IWorld[];
  match: IMatch;
}

export const MatchesSelector = ({
  matches,
  worlds,
  match,
}: MatchesSelectorProps) => {
  return (
    <ul>
      {matches.map((cMatch) => (
        <li
          key={cMatch.id}
          className={cMatch.id === match.id ? "font-medium" : "hidden"}
        >
          <Link to={`/${cMatch.id}`}>
            <WorldList match={cMatch} worlds={worlds} color="green" />
            <br />
            <WorldList match={cMatch} worlds={worlds} color="blue" />
            <br />
            <WorldList match={cMatch} worlds={worlds} color="red" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

interface WorldListProps {
  match: IMatchOverview;
  worlds: IWorld[];
  color: keyof IColorsWithNumbers;
}

const WorldList = ({ match, worlds, color }: WorldListProps) => (
  <span className={`text-${color}`}>
    {worldName(match.worlds[color], worlds)}
    {match.all_worlds[color].map((allWorld) =>
      allWorld !== match.worlds[color] ? worldName(allWorld, worlds) : ""
    )}
  </span>
);

const worldName = (worldId: number, worlds: IWorld[]): string =>
  worlds.find((world) => world.id === worldId)?.name ?? "";
