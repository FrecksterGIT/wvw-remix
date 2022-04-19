import { useGuildDetails } from "~/hooks/use-guild-details";

interface GuildEmblemProps {
  guildId: string;
}

export const GuildEmblem = ({guildId}: GuildEmblemProps) => {
  const data = useGuildDetails(guildId);
  console.log(data);

  return <></>;
};
