import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { GuildNameLoaderData } from "~/routes/guilds/$guildId";
import type { IGuild } from "~/models/interfaces.server";

const guildCache: Map<string, IGuild> = new Map();

export const useGuildDetails = (guildId: string): IGuild | undefined => {
  const [data, setData] = useState<IGuild>();
  const fetcher = useFetcher<GuildNameLoaderData>();

  useEffect(() => {
    if (guildCache.has(guildId)) {
      setData(guildCache.get(guildId));
    } else {
      fetcher.load(`/guilds/${guildId}`);
    }
  }, [guildId]);


  useEffect(() => {
    if (fetcher.data?.guild) {
      setData(fetcher.data.guild);
      guildCache.set(guildId, fetcher.data.guild);
    }
  }, [fetcher.data, guildId]);

  return data;
};
