"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import Swal from "sweetalert2";
import { createClient } from "@/app/lib/supabase/client";
import { toggleFavorite } from "@/app/actions/favoriteActions";

type FavoriteType = "listing" | "event" | "job" | "community";

export default function SaveButton({
  itemId,
  itemType,
  initialSaved = false,
}: {
  itemId: string;
  itemType: FavoriteType;
  initialSaved?: boolean;
}) {
  const supabase = createClient();

  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
      setCheckingUser(false);
    }

    checkUser();
  }, [supabase]);

  async function handleSave() {
    if (!isLoggedIn) return;

    setLoading(true);

    const result = await toggleFavorite(itemId, itemType);

    setLoading(false);

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: result.message,
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    setSaved(result.saved || false);
  }

  if (checkingUser || !isLoggedIn) return null;

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleSave}
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition disabled:opacity-60 ${
        saved
          ? "bg-fuchsia-300 text-[#160524]"
          : "border border-violet-100/15 bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <Bookmark
        className={`mr-1 h-4 w-4 ${saved ? "fill-[#160524]" : ""}`}
      />
      {loading ? "Saving..." : saved ? "Saved" : "Save"}
    </button>
  );
}