import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { GuildNameLoaderData } from "~/routes/guilds/$guildId";

interface GuildNameProps {
  guildId: string;
}

const guildCache: Record<string, string> = {};

export const GuildName = ({ guildId }: GuildNameProps) => {
  const fetcher = useFetcher<GuildNameLoaderData>();
  const [name, setName] = useState("");

  useEffect(() => {
    if (guildCache[guildId]) {
      setName(guildCache[guildId]);
    } else {
      fetcher.load(`/guilds/${guildId}`);
    }
  }, [guildId]);

  useEffect(() => {
    if (fetcher.data) {
      const shownName = `${fetcher.data.guild?.name} [${fetcher.data.guild?.tag}]`;
      guildCache[guildId] = shownName;
      setName(shownName);
    }
  }, [fetcher.data, guildId]);

  return <>{name}</>;
};
