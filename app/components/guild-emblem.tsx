interface GuildEmblemProps {
  guildId: string;
}

export const GuildEmblem = ({ guildId }: GuildEmblemProps) => {
  return (
    <div
      className="w-[50px] h-[50px] bg-contain"
      style={{
        backgroundImage: `url(/emblems/${guildId})`,
      }}
    ></div>
  );
};
