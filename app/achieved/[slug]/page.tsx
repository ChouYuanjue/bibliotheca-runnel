import { redirect } from "next/navigation";

export default function AchievedItemRedirect({ params }: { params: { slug: string } }) {
  redirect(`/artifacts/${params.slug}`);
}
