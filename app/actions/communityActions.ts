"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";
import { createNotification } from "./notificationActions";

export async function createCommunityPost(input: {
  title: string;
  category: string;
  content: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { error } = await supabase.from("community_posts").insert({
    user_id: user.id,
    title: input.title,
    category: input.category,
    content: input.content,
    status: "pending",
  });

  if (error) return { success: false, message: error.message };

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return {
    success: true,
    message: "Your post has been submitted for admin approval.",
  };
}

export async function createCommunityReply(input: {
  postId: string;
  content: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, message: "Please login first." };

  const { error } = await supabase.from("community_replies").insert({
    post_id: input.postId,
    user_id: user.id,
    content: input.content,
    status: "pending",
  });

  if (error) return { success: false, message: error.message };

  revalidatePath(`/community/${input.postId}`);
  revalidatePath("/admin/community");

  return {
    success: true,
    message: "Your reply has been submitted for admin approval.",
  };
}

export async function updateCommunityPostStatus(
  postId: string,
  status: "approved" | "rejected",
) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("community_posts")
    .select("id, title, user_id")
    .eq("id", postId)
    .maybeSingle();

  const { error } = await supabase
    .from("community_posts")
    .update({ status })
    .eq("id", postId);

  if (error) return { success: false, message: error.message };

  if (post?.user_id) {
    await createNotification({
      userId: post.user_id,
      title:
        status === "approved"
          ? "Community post approved"
          : "Community post rejected",
      message:
        status === "approved"
          ? `Your post "${post.title}" has been approved.`
          : `Your post "${post.title}" was rejected.`,
      type: status === "approved" ? "success" : "warning",
      link: status === "approved" ? `/community/${post.id}` : "/community",
    });
  }

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return { success: true, message: `Post ${status}.` };
}

export async function updateCommunityReplyStatus(
  replyId: string,
  postId: string,
  status: "approved" | "rejected",
) {
  const supabase = await createClient();

  const { data: reply } = await supabase
    .from("community_replies")
    .select("id, user_id, post_id")
    .eq("id", replyId)
    .maybeSingle();

  const { error } = await supabase
    .from("community_replies")
    .update({ status })
    .eq("id", replyId);

  if (error) return { success: false, message: error.message };

  if (reply?.user_id) {
    await createNotification({
      userId: reply.user_id,
      title: status === "approved" ? "Reply approved" : "Reply rejected",
      message:
        status === "approved"
          ? "Your community reply has been approved."
          : "Your community reply was rejected.",
      type: status === "approved" ? "success" : "warning",
      link: `/community/${postId}`,
    });
  }

  revalidatePath(`/community/${postId}`);
  revalidatePath("/admin/community");

  return { success: true, message: `Reply ${status}.` };
}

export async function deleteCommunityPost(postId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", postId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return { success: true, message: "Post deleted." };
}

export async function deleteCommunityReply(replyId: string, postId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("community_replies")
    .delete()
    .eq("id", replyId);

  if (error) return { success: false, message: error.message };

  revalidatePath(`/community/${postId}`);
  revalidatePath("/admin/community");

  return { success: true, message: "Reply deleted." };
}
