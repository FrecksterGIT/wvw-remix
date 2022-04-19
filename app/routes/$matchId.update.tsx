import { json, type LoaderFunction } from "@remix-run/node";
import { commitSession } from "~/session.server";
import type { IMatch } from "~/models/interfaces.server";
import { sessionData } from "~/models/user.server";
import { loadMatch } from "~/models/matches.server";

export interface UpdateLoaderData {
  match: IMatch;
  error?: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { session, matchId: oldMatchId } = await sessionData(request);
  const matchId = params.matchId ?? "";

  if (matchId !== oldMatchId) {
    throw new Response("", { status: 404 });
  }

  const match = await loadMatch(matchId);
  if (!match) {
    throw new Response("", { status: 404 });
  }

  return json<UpdateLoaderData>(
    {
      match,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
