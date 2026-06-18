import { createClient } from "@/app/lib/supabase/server";

export async function getAllReportsForAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_reports")
    .select(
      `
      *,
      profiles:reporter_id (
        full_name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Reports fetch error:", error.message);
    return [];
  }

  return data || [];
}

export async function getPendingReportsCount() {
  const supabase = await createClient();

  const { count } = await supabase
    .from("content_reports")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return count || 0;
}