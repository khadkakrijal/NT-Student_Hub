import { createClient } from "@/app/lib/supabase/server";

export async function getHomeDashboardStats() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    listings,
    jobs,
    events,
    posts,
    saved,
    unreadNotifications,
  ] = await Promise.all([
    getCount(supabase, "accommodation_listings", "status", "approved"),
    getCount(supabase, "jobs", "status", "active"),
    getCount(supabase, "events", "status", "approved"),
    getCount(supabase, "community_posts", "status", "approved"),

    user
      ? getCount(supabase, "favorites", "user_id", user.id)
      : Promise.resolve(0),

    user
      ? supabase
          .from("notifications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_read", false)
          .then(({ count }) => count || 0)
      : Promise.resolve(0),
  ]);

  return {
    listings,
    jobs,
    events,
    posts,
    saved,
    unreadNotifications,
  };
}

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  column?: string,
  value?: string,
) {
  let query = supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (column && value) {
    query = query.eq(column, value);
  }

  const { count, error } = await query;

  if (error) {
    console.error(`Count error for ${table}:`, error.message);
    return 0;
  }

  return count || 0;
}