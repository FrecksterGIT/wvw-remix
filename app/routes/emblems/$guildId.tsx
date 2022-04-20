import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getEmblem } from "~/models/emblem.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.guildId, "require guildId");
  const png2 = await getEmblem(request, params.guildId);

  return new Response(png2, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
