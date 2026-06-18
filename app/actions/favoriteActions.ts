"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

type FavoriteType = "listing" | "event" | "job" | "community";

export async function toggleFavorite(itemId: string, itemType: FavoriteType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Please login first." };
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id);

    if (error) return { success: false, message: error.message };

    revalidatePath("/");
    return { success: true, saved: false, message: "Removed from saved." };
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: user.id,
    item_id: itemId,
    item_type: itemType,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  return { success: true, saved: true, message: "Saved successfully." };
}