import type { IMatch, IWorld } from "~/models/interfaces.server";
import { WorldList } from "~/components/world-list";

interface CurrentWorldsProps {
  worlds: IWorld[];
  match: IMatch;
}

export const CurrentWorlds = ({ worlds, match }: CurrentWorldsProps) => {
  return (
    <>
      <p>&nbsp;</p>
      <ul>
        <li>
          <WorldList match={match} worlds={worlds} color="green" />
        </li>
        <li>
          <WorldList match={match} worlds={worlds} color="blue" />
        </li>
        <li>
          <WorldList match={match} worlds={worlds} color="red" />
        </li>
      </ul>
    </>
  );
};
