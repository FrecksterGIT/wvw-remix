import { useEffect, useState } from "react";
import {
  type LoaderFunction,
  type MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { commitSession } from "~/session.server";
import type { UpdateLoaderData } from "~/routes/$matchId.update";
import { sessionData } from "~/models/user.server";
import {
  loadMatch,
  loadMatches,
  loadObjectives,
  loadWorlds,
} from "~/models/matches.server";
import type {
  IMatch,
  IMatchOverview,
  IObjective,
  IWorld,
} from "~/models/interfaces.server";
import { WorldMap } from "~/components/world-map";
import { CurrentIncomes } from "~/components/current-incomes";
import { VictoryPoints } from "~/components/victory-points";
import { MatchLog } from "~/components/match-log";
import { CurrentWorlds } from "~/components/current-worlds";
import { CurrentPoints } from "~/components/current-points";
import { CurrentIncomesChart } from "~/components/current-incomes-chart";

interface LoaderData {
  matches: IMatchOverview[];
  match: IMatch;
  worlds: IWorld[];
  objectives: IObjective[];
  error?: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { session, matchId: oldMatchId } = await sessionData(request);
  const param = params.matchId ?? "";
  const matches = await loadMatches();
  if (!matches) {
    throw new Response("", { status: 404 });
  }

  const matchId = matches.some((match) => match.id === param)
    ? param
    : oldMatchId;
  if (matchId !== oldMatchId) {
    session.set("matchId", matchId);
    return redirect(`/${matchId}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const match = await loadMatch(matchId);
  const worlds = await loadWorlds();
  const objectives = await loadObjectives();
  if (!match || !worlds || !objectives) {
    throw new Response("", { status: 404 });
  }

  return json<LoaderData>(
    {
      matches,
      match,
      worlds,
      objectives,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const meta: MetaFunction = () => {
  return {
    title: "Startseite",
  };
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();
  const [matches, setMatches] = useState(loaderData.matches);
  const [match, setMatch] = useState(loaderData.match);
  const [worlds, setWorlds] = useState(loaderData.worlds);
  const [objectives, setObjectives] = useState(loaderData.objectives);
  const [windowActive, setWindowActive] = useState<boolean>(true);
  const fetcher = useFetcher<UpdateLoaderData>();

  useEffect(() => {
    setMatches(loaderData.matches);
    setMatch(loaderData.match);
    setWorlds(loaderData.worlds);
    setObjectives(loaderData.objectives);
  }, [loaderData]);

  useEffect(() => {
    if (fetcher.data) {
      setMatch(fetcher.data.match);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (windowActive) {
        fetcher.load(`/${match.id}/update`);
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!windowActive && !document.hidden) {
        fetcher.load(`/${match.id}/update`);
      }
      setWindowActive(document.hidden);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex justify-center">
      <div>
        <div className="h-[50px]">Header</div>
        <WorldMap match={match} objectives={objectives} />
        <div className="flex text-gray">
          <div className="mr-5">
            <CurrentWorlds worlds={worlds} match={match} />
          </div>
          <div className="mr-5">
            <CurrentIncomes match={match} />
          </div>
          <div className="mr-5">
            <CurrentIncomesChart match={match} />
          </div>
          <div className="mr-5">
            <CurrentPoints match={match} />
          </div>
          <div className="mr-5">
            <VictoryPoints match={match} />
          </div>
          <div className="flex-grow">
            <MatchLog match={match} worlds={worlds} objectives={objectives} />
          </div>
        </div>
      </div>
    </main>
  );
}
