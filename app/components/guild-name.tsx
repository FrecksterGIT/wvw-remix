import { useGuildDetails } from "~/hooks/use-guild-details";

interface GuildNameProps {
  guildId: string;
}

export const GuildName = ({ guildId }: GuildNameProps) => {
  const guild = useGuildDetails(guildId);
  console.log(guild);

  return <>{guild && `${guild.name} [${guild.tag}]`}</>;
};
