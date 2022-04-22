import { useMemo } from "react";

interface GuildEmblemProps {
  guildId: string;
}

export const GuildEmblem = ({ guildId }: GuildEmblemProps) => {
  const emblemUrl = useMemo(
    () => `http://wvw.sentientart.net/emblem/${guildId}/128.png`,
    [guildId]
  );
  return (
    <div
      className="h-[50px] w-[50px] bg-contain"
      style={{
        backgroundImage: `url(${emblemUrl})`,
      }}
    ></div>
  );
};
