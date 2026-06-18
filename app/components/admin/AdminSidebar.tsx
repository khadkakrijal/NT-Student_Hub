import { createClient } from "@/app/lib/supabase/server";
import AdminSidebarClient from "./AdminSidebarClient";

export default async function AdminSidebar() {
  const supabase = await createClient();

  const [
    pendingListings,
    pendingEvents,
    pendingPosts,
    pendingReplies,
    pendingJobs,
  ] = await Promise.all([
    getCount(supabase, "accommodation_listings", "status", "pending"),
    getCount(supabase, "events", "status", "pending"),
    getCount(supabase, "community_posts", "status", "pending"),
    getCount(supabase, "community_replies", "status", "pending"),
    getCount(supabase, "jobs", "status", "draft"),
  ]);

  return (
    <AdminSidebarClient
      counts={{
        listings: pendingListings,
        events: pendingEvents,
        community: pendingPosts + pendingReplies,
        jobs: pendingJobs,
      }}
    />
  );
}

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  column: string,
  value: string,
) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(column, value);

  if (error) {
    console.error(`Count error for ${table}:`, error.message);
    return 0;
  }

  return count || 0;
}
