interface GuildEmblemProps {
  guildId: string;
}

export const GuildEmblem = ({ guildId }: GuildEmblemProps) => {
  return (
    <div
      className="h-[50px] w-[50px] bg-contain"
      style={{
        backgroundImage: `url(/emblems/${guildId})`,
      }}
    ></div>
  );
};
