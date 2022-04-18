import { type LoaderFunction, redirect } from "@remix-run/node";
import { commitSession } from "~/session.server";
import { sessionData } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { session, matchId } = await sessionData(request);

  return redirect(`/${matchId}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
