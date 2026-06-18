"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

type FeaturedType = "listing" | "job" | "event" | "community";

const tableMap = {
  listing: "accommodation_listings",
  job: "jobs",
  event: "events",
  community: "community_posts",
};

async function isCurrentUserAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.role === "admin";
}

export async function toggleFeaturedItem(
  itemId: string,
  itemType: FeaturedType,
  currentFeatured: boolean,
) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can feature items." };
  }

  const supabase = await createClient();
  const table = tableMap[itemType];

  if (currentFeatured) {
    const { error } = await supabase
      .from(table)
      .update({ featured: false })
      .eq("id", itemId);

    if (error) return { success: false, message: error.message };

    revalidateFeaturedPaths();

    return {
      success: true,
      message: "Item removed from featured.",
    };
  }

  const { error: clearError } = await supabase
    .from(table)
    .update({ featured: false })
    .eq("featured", true);

  if (clearError) {
    return { success: false, message: clearError.message };
  }

  const { error } = await supabase
    .from(table)
    .update({ featured: true })
    .eq("id", itemId);

  if (error) return { success: false, message: error.message };

  revalidateFeaturedPaths();

  return {
    success: true,
    message:
      "Item marked as featured. Other featured items in this category were removed.",
  };
}

function revalidateFeaturedPaths() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath("/admin/jobs");
  revalidatePath("/admin/events");
  revalidatePath("/admin/community");
}
