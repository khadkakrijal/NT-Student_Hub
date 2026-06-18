import { notFound } from "next/navigation";
import { getLivingPage } from "@/app/data/livingInDarwinData";
import LivingPageTemplate from "@/app/components/living-in-darwin/LivingPageTemplate";

export default function Page() {
  const page = getLivingPage("education");
  if (!page) notFound();
  return <LivingPageTemplate page={page} />;
}