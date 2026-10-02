import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./ProfileForm";

export const metadata = { title: "Your profile" };

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Should not happen — handle_new_user() creates this row at
    // signup — but fail safely rather than crashing the page.
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-serif text-3xl">Your profile</h1>
      <p className="mt-1 text-sm text-ink-light/60 dark:text-ink-dark/60">{user.email}</p>
      <ProfileForm profile={profile} />
    </div>
  );
}
