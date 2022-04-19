import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { IGuild } from "~/models/interfaces.server";
import { loadGuild } from "~/models/matches.server";

export interface GuildNameLoaderData {
  guild: IGuild | null;
}

export const loader: LoaderFunction = async ({ params }) => {
  const guild = params.guildId ? await loadGuild(params.guildId) : null;

  return json<GuildNameLoaderData>({
    guild,
  });
};
