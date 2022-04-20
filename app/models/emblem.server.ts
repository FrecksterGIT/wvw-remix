import { loadBackgrounds, loadColors, loadForegrounds, loadGuild } from "~/models/matches.server";
import type { IColor, IEmblemDetailsDef, IForeBackground, IGuild } from "~/models/interfaces.server";
import Jimp from "jimp";

type EmblemConfig = [string[], IColor[], boolean, boolean];

export const getEmblem = async (request: Request, guildId: string): Promise<Buffer | null> => {
  const guild = await loadGuild(guildId);

  const colors = await loadColors();
  const foregrounds = await loadForegrounds();
  const backgrounds = await loadBackgrounds();
  if (guild && foregrounds && backgrounds && colors) {
    const foreground = getForeground(guild, foregrounds, colors);
    const background = getBackground(guild, backgrounds, colors);

    const url = new URL(request.url);
    const resourceUrl = `${url.protocol}//${url.host}`;
    const urlPrefix = `${resourceUrl}/_static/emblems/`;
    return await draw(foreground, background, urlPrefix);
  }

  return null;
};

const getForeground = (guild: IGuild, foregrounds: IForeBackground[], colors: IColor[]) => {
  return getConfig(guild, foregrounds, colors, guild.emblem.foreground,
    "FlipForegroundHorizontal", "FlipForegroundVertical");
};

const getBackground = (guild: IGuild, backgrounds: IForeBackground[], colors: IColor[]) => {
  return getConfig(guild, backgrounds, colors, guild.emblem.background,
    "FlipBackgroundHorizontal", "FlipBackgroundVertical");
};

const getConfig = (guild: IGuild, res: IForeBackground[], colors: IColor[], def: IEmblemDetailsDef, horFlag: string, verFlag: string): EmblemConfig => {
  const fgDef = res.find((fg) => fg.id === def.id);
  const files: string[] = fgDef?.layers.map((u) => u.substring(u.lastIndexOf("/") + 1, u.length)) ?? [];

  const flags = guild.emblem.flags;
  const flipHorizontal: boolean = flags.includes(horFlag);
  const flipVertical: boolean = flags.includes(verFlag);
  const emblemColors: IColor[] = def.colors.map((color: number) => (colors.find((c: IColor) => c.id === color) as IColor));

  return [files, emblemColors, flipHorizontal, flipVertical];
};

const draw = async (background: EmblemConfig, foreground: EmblemConfig, urlPrefix: string): Promise<Buffer> => {
  return new Promise(async (resolve) => {
    let image: Jimp = await drawBackground(background, urlPrefix);
    image = await drawForeground(foreground, urlPrefix, image);
    image.getBuffer("image/png", (e, buff) => {
      resolve(buff);
    });
  });
};

const drawBackground = async (background: EmblemConfig, urlPrefix: string): Promise<Jimp> => {
  return new Promise<Jimp>(async (resolve) => {
    const [images, colors, flipHorizontal, flipVertical]: [string[], IColor[], boolean, boolean] = background;
    const img = await Jimp.read(urlPrefix + images[0]);
    img.mirror(flipHorizontal, flipVertical);
    console.log(colors[0]);
    resolve(colorize(img, colors[0]));
  });
};

const drawForeground = async (def: EmblemConfig, urlPrefix: string, image: Jimp): Promise<Jimp> => {
  return new Promise<Jimp>(async (resolve) => {
    const [images, colors, flipHorizontal, flipVertical]: [string[], IColor[], boolean, boolean] = def;
    images.reverse();
    const img = await drawImage(image, images, colors, urlPrefix);
    img.mirror(flipHorizontal, flipVertical);
    resolve(img);
  });
};

const drawImage = async (composed: Jimp, images: string[], colors: IColor[], urlPrefix: string, count: number = 0): Promise<Jimp> => {
  return new Promise<Jimp>(async (resolve) => {
    const image = images.pop();
    if (image) {
      const imagePart = await Jimp.read(urlPrefix + image);
      const color = colors[count === 1 || colors.length === 1 ? 0 : 1];
      console.log(`drawImage`, color, colors);
      composed.composite(colorize(imagePart, color), 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1
      }, () => {
        resolve(drawImage(composed, images, colors, urlPrefix, ++count));
      });
    } else {
      resolve(composed);
    }
  });
};

const colorize = (image: Jimp, color: IColor) => {
  if (!color) {
    return image;
  }
  const base = color.cloth;
  return image.clone()
    .greyscale((err, value) => value.color([
      { apply: "mix", params: [translateColor(base.rgb), 100] }
    ]));
};

const translateColor = (color: [number, number, number]) => {
  return "#" + pad(color[0]) + pad(color[1]) + pad(color[2]);
};

const pad = (color: number, width: number = 2, z: string = "0") => {
  const n = color.toString(16);
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/*
const guild = await this.gw2ApiService.getGuild(guildId);
if (!guild.emblem) {
  return "";
}
return await this.draw(background, foreground);
}

private async
draw(background, foreground);
{
  return new Promise(async (resolve) => {
    let image: Jimp = await this.drawBackground(background);
    image = await this.drawForeground(foreground, image);
    image.getBuffer("image/png", (e, buff) => {
      resolve(buff);
    });
  });
}

private async
drawBackground(background);
:
Promise < Jimp > {
  return new Promise<Jimp>(async (resolve) => {
    const [images, colors, flipHorizontal, flipVertical]: [string[], IColor[], boolean, boolean] = background;
    const img = await EmblemPngService.readImageResource(images[0]);
    img.mirror(flipHorizontal, flipVertical);
    resolve(EmblemPngService.colorize(img, colors[0]));
  });
};

private async
drawForeground(def, image
:
Jimp;
):
Promise < Jimp > {
  return new Promise<Jimp>(async (resolve) => {
    const [images, colors, flipHorizontal, flipVertical]: [string[], IColor[], boolean, boolean] = def;
    images.reverse();
    const img = await EmblemPngService.drawImage(image, images, colors);
    img.mirror(flipHorizontal, flipVertical);
    resolve(img);
  });
};

private static async
drawImage(composed
:
Jimp, images;
:
string[], colors;
:
IColor[], count;
:
number = 0;
):
Promise < Jimp > {
  return new Promise<Jimp>(async (resolve) => {
    const image = images.pop();
    if (image) {
      const imagePart = await EmblemPngService.readImageResource(image);
      const color = colors[count === 1 ? 0 : 1];
      composed.composite(EmblemPngService.colorize(imagePart, color), 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1
      }, () => {
        resolve(this.drawImage(composed, images, colors, ++count));
      });
    } else {
      resolve(composed);
    }
  });
};

private static
colorize(image
:
Jimp, color;
:
IColor;
)
{
  const base = color.cloth;
  return image.clone()
    .greyscale((err, value) => value.color([
      { apply: "mix", params: [EmblemPngService.translateColor(base.rgb), 100] }
    ]));
}

private static async
readImageResource(imgFile);
{
  const PATH = "./emblems/";
  return await Jimp.read(PATH + imgFile);
}

private async
getForeground(guild);
{
  const foregrounds = await this.gw2ApiService.getEmblemForegrounds();
  return this.getConfig(guild, foregrounds, guild.emblem.foreground,
    "FlipForegroundHorizontal", "FlipForegroundVertical");
}

private async
getBackground(guild);
{
  const backgrounds = await this.gw2ApiService.getEmblemBackgrounds();
  return this.getConfig(guild, backgrounds, guild.emblem.background,
    "FlipBackgroundHorizontal", "FlipBackgroundVertical");
}

private async
getConfig(guild, res, def, horFlag, verFlag);
{
  const fgDef = res.find((fg) => fg.id === def.id);
  const files: string[] = fgDef.layers.map((u) => u.substring(u.lastIndexOf("/") + 1, u.length));

  const flags = guild.emblem.flags;
  const flipHorizontal: boolean = flags.includes(horFlag);
  const flipVertical: boolean = flags.includes(verFlag);

  const colors = await this.gw2ApiService.getColors();
  const emblemColors: IColor[] = def.colors.map((color: number) => (colors.find((c: IColor) => c.id === color)));

  return [files, emblemColors, flipHorizontal, flipVertical];
}

private static
translateColor(color);
{
  return "#" + EmblemPngService.pad(color[0]) + EmblemPngService.pad(color[1]) + EmblemPngService.pad(color[2]);
}

private static
pad(color
:
number, width;
:
number = 2, z;
:
string = "0";
)
{
  const n = color.toString(16);
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
*/
