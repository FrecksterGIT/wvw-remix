import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { GuildNameLoaderData } from "~/routes/guilds/$guildId";
import type { IGuild } from "~/models/interfaces.server";

const guildCache: Map<string, Promise<IGuild>> = new Map();

export const useGuildDetails = (guildId: string): IGuild | undefined => {
  const [data, setData] = useState<IGuild>();
  const fetcher = useFetcher<GuildNameLoaderData>();

  useEffect(() => {
    if (guildCache.has(guildId)) {
      guildCache.get(guildId)?.then((data) => {
        setData(data);
      });
    } else {
      guildCache.set(guildId, new Promise((resolve) => {
        console.log('loading promise');
        fetcher.load(`/guilds/${guildId}`);
        if (fetcher.data?.guild) {
          console.log('resolving data');
          resolve(fetcher.data.guild);
        }
      }));
    }
  }, [guildId, fetcher.data]);

  return data;
};
