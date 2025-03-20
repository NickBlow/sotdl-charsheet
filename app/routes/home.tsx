import { redirect } from "react-router";
import type { Route } from "./+types/home";
import { generateCharacterId } from "~/util/id-gen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader() {
  const newId = generateCharacterId();
  return redirect(`${newId}`);
}

export default function Home() {
  return <></>;
}
