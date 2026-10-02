"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

const DEFAULT_AVATARS = [
  { id: "a1", label: "Avatar A", background: "#dcefe4", skin: "#a96f4f", hair: "#342a27", shirt: "#367c64", style: "short" },
  { id: "a2", label: "Avatar B", background: "#f5e6c8", skin: "#edc49d", hair: "#684332", shirt: "#bc754d", style: "curls" },
  { id: "a3", label: "Avatar C", background: "#dce8f3", skin: "#82563f", hair: "#252329", shirt: "#536e9d", style: "long" },
  { id: "a4", label: "Avatar D", background: "#f0dfeb", skin: "#d59672", hair: "#704439", shirt: "#aa6085", style: "side" },
];

type AvatarOption = (typeof DEFAULT_AVATARS)[number];

function avatarDataUrl(avatar: AvatarOption) {
  const hairPath = {
    short: "M14 21c-1-9 3-14 10-14 8 0 12 5 10 14l-3-5-4-3-10 2z",
    curls: "M14 21c-3-7 1-14 5-13 2-5 8-4 10-1 5-1 8 5 5 13l-3-5-4-2-10 2z",
    long: "M13 23c-2-10 2-16 11-16 9 0 13 6 11 16l-3 12-4-2 1-13-4-7-10 3v17l-4 2z",
    side: "M14 22c-2-9 2-15 10-15 8 0 12 5 10 14l-5-6c-3 2-8 3-13 3z",
  }[avatar.style];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="${avatar.background}"/><path d="M5 48c1.7-9.2 8.5-14 19-14s17.3 4.8 19 14" fill="${avatar.shirt}"/><path d="M19 29h10v9H19z" fill="${avatar.skin}"/><ellipse cx="24" cy="21" rx="10" ry="12" fill="${avatar.skin}"/><path d="${hairPath}" fill="${avatar.hair}"/><circle cx="20" cy="22" r=".8" fill="#292522"/><circle cx="28" cy="22" r=".8" fill="#292522"/><path d="M21 28c2 1.5 4 1.5 6 0" fill="none" stroke="#754a3c" stroke-width="1.2" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function AvatarIllustration({ avatar }: { avatar: AvatarOption }) {
  return (
    <Image src={avatarDataUrl(avatar)} alt="" width={40} height={40} unoptimized />
  );
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState(profile.full_name);
  const [nickname, setNickname] = useState(profile.nickname ?? "");
  const [institution, setInstitution] = useState(profile.institution ?? "");
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar_url ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        nickname: nickname || null,
        institution: institution || null,
        avatar_url: selectedAvatar || null,
      })
      .eq("id", profile.id);

    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    router.refresh();
  }

  const showInstitution = profile.account_type === "student" || profile.account_type === "employed";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <fieldset>
        <legend className="block text-sm font-medium">Avatar (optional)</legend>
        <div className="mt-2 flex max-w-full flex-wrap gap-3">
          {DEFAULT_AVATARS.map((avatar) => {
            const dataUrl = avatarDataUrl(avatar);
            const isSelected = selectedAvatar === avatar.id || selectedAvatar === dataUrl;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => setSelectedAvatar(dataUrl)}
                aria-label={avatar.label}
                aria-pressed={isSelected}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-accent ring-2 ring-accent"
                    : "border-ink-light/20 dark:border-ink-dark/20"
                }`}
              >
                <AvatarIllustration avatar={avatar} />
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium">
          Full name
        </label>
        <input
          id="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
        />
      </div>

      <div>
        <label htmlFor="nickname" className="block text-sm font-medium">
          Nickname
        </label>
        <input
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="What should we call you on the dashboard?"
          className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
        />
      </div>

      {showInstitution && (
        <div>
          <label htmlFor="institution" className="block text-sm font-medium">
            {profile.account_type === "student" ? "University" : "Company"}
          </label>
          <input
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-light/20 bg-transparent px-3 py-2 dark:border-ink-dark/20"
          />
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          Saved.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-accent px-4 py-2.5 text-white transition hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "loading" ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
