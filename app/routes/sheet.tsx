import type { Route } from "./+types/home";
import ShadowOfTheDemonLordSheet from "~/components/Sheet";
import { useParams } from "react-router";

export function meta({ matches }: Route.MetaArgs) {
  const charData = matches.filter((x) => x?.id == "routes/sheet")[0];
  // @ts-ignore
  const name = charData?.data?.info?.name;
  if (!charData || !name) {
    return [
      { title: "New Character" },
      { name: "description", content: "New SotDL character!" },
    ];
  }
  return [
    { title: `Charsheet for ${name}` },
    {
      name: "description",
      content: `Shadow of the demon lord character sheet for ${name}`,
    },
  ];
}

export async function loader({ context, params }: Route.LoaderArgs) {
  const durableObjectId = context.cloudflare.env.SHEET_STORE.idFromName(
    params.id || ""
  );
  const dObj = context.cloudflare.env.SHEET_STORE.get(durableObjectId);
  // @ts-ignore
  return await dObj.getLatestData();
}

export async function action({ request, params, context }: Route.ActionArgs) {
  let data = await request.json();
  const durableObjectId = context.cloudflare.env.SHEET_STORE.idFromName(
    params.id || ""
  );
  const dObj = context.cloudflare.env.SHEET_STORE.get(durableObjectId);
  await dObj.saveData(data);
  return "OK";
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { id } = useParams();
  return <ShadowOfTheDemonLordSheet key={id} initialData={loaderData} />;
}
