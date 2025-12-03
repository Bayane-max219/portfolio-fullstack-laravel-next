import { redirect } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function LegacyProjectDetailRedirect({ params }: PageProps) {
  const id = params.id;

  if (!id) {
    redirect("/vitrine");
  }

  redirect(`/vitrine/projets?id=${encodeURIComponent(id)}`);
}
