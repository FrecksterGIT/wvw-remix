import axios from "cachios";
import type {
  IColor,
  IGuild,
  IMatch,
  IMatchOverview,
  IObjective,
  IWorld,
} from "~/models/interfaces.server";
import type { IForeBackground } from "~/models/interfaces.server";

const API_ENDPOINT = "https://api.guildwars2.com/";

const apiFetch = async <T>(url: string, ttl = 300): Promise<T | null> => {
  const res = await axios
    .get(`${API_ENDPOINT}${url}`, {
      ttl,
    })
    .catch(() => {
      return null;
    });
  if (!res) {
    return null;
  }
  if (res.status === 200) {
    return res.data as T;
  }

  return null;
};

export const loadMatches = async (): Promise<IMatchOverview[] | null> => {
  return await apiFetch<IMatchOverview[]>(
    "v2/wvw/matches/overview?ids=all",
    3600
  );
};

export const loadMatch = async (matchId: string): Promise<IMatch | null> => {
  return await apiFetch<IMatch>(`v2/wvw/matches/${matchId}`, 10);
};

export const loadWorlds = async (): Promise<IWorld[] | null> => {
  return await apiFetch<IWorld[]>(`v2/worlds?ids=all`, 3600);
};

export const loadObjectives = async (): Promise<IObjective[] | null> => {
  return await apiFetch<IObjective[]>(`v2/wvw/objectives?ids=all`, 3600);
};

export const loadGuild = async (guildId: string): Promise<IGuild | null> => {
  return await apiFetch<IGuild>(`v2/guild/${guildId}`, 3600);
};

export const loadForegrounds = async (): Promise<IForeBackground[] | null> => {
  return await apiFetch<IForeBackground[]>(
    `v2/emblem/foregrounds?ids=all`,
    3600
  );
};

export const loadBackgrounds = async (): Promise<IForeBackground[] | null> => {
  return await apiFetch<IForeBackground[]>(
    `v2/emblem/backgrounds?ids=all`,
    3600
  );
};

export const loadColors = async (): Promise<IColor[] | null> => {
  return await apiFetch<IColor[]>(`v2/colors?ids=all`, 3600);
};
