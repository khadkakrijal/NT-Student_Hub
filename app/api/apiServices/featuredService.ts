import { createClient } from "@/app/lib/supabase/server";

export async function getFeaturedContent() {
  const supabase = await createClient();

  const [listing, job, event, post] = await Promise.all([
    supabase
      .from("accommodation_listings")
      .select("id, title, suburb, rent_per_week, room_type, featured")
      .eq("status", "approved")
      .eq("featured", true)
      .limit(1)
      .maybeSingle(),

    supabase
      .from("jobs")
      .select("id, slug, title, company_name, suburb, job_type, featured")
      .eq("status", "active")
      .eq("featured", true)
      .limit(1)
      .maybeSingle(),

    supabase
      .from("events")
      .select("id, slug, title, category, suburb, location_name, event_date, featured")
      .eq("status", "approved")
      .eq("featured", true)
      .limit(1)
      .maybeSingle(),

    supabase
      .from("community_posts")
      .select("id, title, category, featured")
      .eq("status", "approved")
      .eq("featured", true)
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    listing: listing.data,
    job: job.data,
    event: event.data,
    post: post.data,
  };
}