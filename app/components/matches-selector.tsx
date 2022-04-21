import { Link } from "@remix-run/react";
import type {
  IMatch,
  IMatchOverview,
  IWorld,
} from "~/models/interfaces.server";
import { WorldList } from "~/components/world-list";

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
