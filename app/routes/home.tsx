import { redirect } from "react-router";
import type { Route } from "./+types/home";
import { generateCharacterId } from "~/util/id-gen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SotDL Char Sheet" },
    { name: "description", content: "Online Char Sheet for Demon Lord!" },
  ];
}

export function loader() {
  const newId = generateCharacterId();
  return redirect(`${newId}`);
}

export default function Home() {
  return <></>;
}
