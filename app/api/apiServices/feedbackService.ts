import { createClient } from "@/app/lib/supabase/server";

export async function getAllFeedbackForAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Feedback fetch error:", error.message);
    return [];
  }

  return data || [];
}

export async function getNewFeedbackCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("feedback")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  if (error) return 0;

  return count || 0;
}