export interface IEmblemDetailsDef {
  id: number;
  colors: number[];
}

export interface IEmblemDef {
  background: IEmblemDetailsDef;
  foreground: IEmblemDetailsDef;
  flags: string[];
}

export interface IGuild {
  id: string;
  name: string;
  tag: string;
  emblem: IEmblemDef;
}

export enum ObjectiveType {
  Castle = "Castle",
  Keep = "Keep",
  Tower = "Tower",
  Camp = "Camp",
  Ruins = "Ruins",
}

export interface IColorsWithNumbers {
  red: number;
  blue: number;
  green: number;
}

export interface IColorsWithStrings {
  red: string;
  blue: string;
  green: string;
}

export interface IColorsWithNumbersArray {
  red: number[];
  blue: number[];
  green: number[];
}

export interface IColorsWithStringsArray {
  red: string[];
  blue: string[];
  green: string[];
}

export interface IMapScore {
  type: string;
  scores: IColorsWithNumbers;
}

export interface ISkirmish {
  id: number;
  scores: IColorsWithNumbers;
  map_scores: IMapScore[];
}

export interface IBonus {
  type: string;
  owner: string;
}

export interface IMatchObjective {
  id: string;
  type: string;
  owner: string;
  last_flipped: Date;
  points_tick: number;
  points_capture: number;
  claimed_by?: string;
  claimed_at?: Date;
  yaks_delivered?: number;
  guild_upgrades: number[];
  guild?: IGuild;
}

export interface IMap {
  id: number;
  type: ObjectiveType;
  scores: IColorsWithNumbers;
  bonuses: IBonus[];
  objectives: IMatchObjective[];
  deaths: IColorsWithNumbers;
  kills: IColorsWithNumbers;
}

export interface IMatch {
  id: string;
  start_time: string; // Date
  end_time: string; // Date
  scores: IColorsWithNumbers;
  worlds: IColorsWithNumbers;
  all_worlds: IColorsWithNumbersArray;
  deaths: IColorsWithNumbers;
  kills: IColorsWithNumbers;
  victory_points: IColorsWithNumbers;
  skirmishes: ISkirmish[];
  maps: IMap[];
}

export type IMatchOverview = Pick<
  IMatch,
  "id" | "worlds" | "all_worlds" | "start_time" | "end_time"
>;

enum Population {
  Medium = "Medium",
  VeryHigh = "VeryHigh",
  Full = "Full",
}

export interface IWorld {
  id: number;
  name: string;
  population: Population;
}

export interface IObjective {
  id: string;
  name: string;
  sector_id: number;
  type: string;
  map_type: string;
  map_id: 38 | 95 | 96 | 1099;
  coord: number[];
  label_coord: number[];
  marker: string;
  chat_link: string;
  upgrade_id?: number;
}

/* color interface for emblem rendering*/

interface IColorDefinition {
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;
  lightness: number;
  rgb: [number, number, number];
}

export interface IColor {
  id: number;
  name: string;
  base_rgb: [number, number, number];
  cloth: IColorDefinition;
  leather: IColorDefinition;
  metal: IColorDefinition;
  item: number;
  categories: string[];
}

export interface IForeBackground {
  id: number;
  layers: string[];
}
