import { type Session } from "@remix-run/node";
import { getSession } from "~/session.server";

interface SessionData {
  session: Session;
  matchId: string;
}

export const sessionData = async (request: Request): Promise<SessionData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const matchId = session.get("matchId") ?? "2-1";

  return {
    session,
    matchId,
  };
};
