import { createClient } from "@/app/lib/supabase/server";

const postSelect = `
  *,
  profiles:user_id (
    id,
    full_name,
    email,
    role
  ),
  community_replies (
    id,
    status
  )
`;

export async function getApprovedCommunityPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_posts")
    .select(postSelect)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get community posts error:", error.message);
    return [];
  }

  return data || [];
}

export async function getCommunityPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_posts")
    .select(
      `
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role
      )
    `
    )
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();

  if (error) return null;

  return data;
}

export async function getApprovedRepliesByPostId(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("community_replies")
    .select(
      `
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role
      )
    `
    )
    .eq("post_id", postId)
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) return [];

  return data || [];
}

export async function getAllCommunityItemsForAdmin() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("community_posts")
    .select(
      `
      *,
      profiles:user_id (
        full_name,
        email
      )
    `
    )
    .order("created_at", { ascending: false });

  const { data: replies } = await supabase
    .from("community_replies")
    .select(
      `
      *,
      profiles:user_id (
        full_name,
        email
      ),
      community_posts (
        title
      )
    `
    )
    .order("created_at", { ascending: false });

  return {
    posts: posts || [],
    replies: replies || [],
  };
}