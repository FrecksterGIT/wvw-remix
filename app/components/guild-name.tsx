import { useGuildDetails } from "~/hooks/use-guild-details";

interface GuildNameProps {
  guildId: string;
}

export const GuildName = ({ guildId }: GuildNameProps) => {
  const guild = useGuildDetails(guildId);

  return <>{guild && `${guild.name} [${guild.tag}]`}</>;
};
