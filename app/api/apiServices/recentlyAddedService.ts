import { createClient } from "@/app/lib/supabase/server";

export async function getRecentlyAddedContent() {
  const supabase = await createClient();

  const [listings, jobs, events, posts] = await Promise.all([
    supabase
      .from("accommodation_listings")
      .select("id, title, suburb, rent_per_week, room_type, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("jobs")
      .select("id, slug, title, company_name, suburb, job_type, created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("events")
      .select("id, slug, title, category, suburb, location_name, event_date, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("community_posts")
      .select("id, title, category, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  return {
    listings: listings.data || [],
    jobs: jobs.data || [],
    events: events.data || [],
    posts: posts.data || [],
  };
}