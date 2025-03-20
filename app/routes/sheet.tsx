import type { Route } from "./+types/home";
import ShadowOfTheDemonLordSheet from "~/components/Sheet";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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
