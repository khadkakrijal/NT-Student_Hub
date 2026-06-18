"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

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

export async function toggleCommunityPostPinned(
  postId: string,
  currentPinned: boolean,
) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can pin community posts." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("community_posts")
    .update({ pinned: !currentPinned })
    .eq("id", postId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return {
    success: true,
    message: !currentPinned ? "Post pinned successfully." : "Post unpinned.",
  };
}