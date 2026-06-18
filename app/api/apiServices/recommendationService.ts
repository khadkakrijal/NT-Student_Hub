import { createClient } from "@/app/lib/supabase/server";

export async function getPersonalizedRecommendations() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      suburbs: [],
      jobs: [],
      events: [],
      posts: [],
    };
  }

  const { data: favorites } = await supabase
    .from("favorites")
    .select("item_id, item_type")
    .eq("user_id", user.id)
    .eq("item_type", "listing");

  const listingIds = favorites?.map((item) => item.item_id) || [];

  if (!listingIds.length) {
    return {
      suburbs: [],
      jobs: [],
      events: [],
      posts: [],
    };
  }

  const { data: savedListings } = await supabase
    .from("accommodation_listings")
    .select("id, suburb")
    .in("id", listingIds);

  const suburbs = Array.from(
    new Set(savedListings?.map((item) => item.suburb).filter(Boolean)),
  );

  if (!suburbs.length) {
    return {
      suburbs: [],
      jobs: [],
      events: [],
      posts: [],
    };
  }

  const [jobs, events, posts] = await Promise.all([
    supabase
      .from("jobs")
      .select("id, slug, title, company_name, suburb, job_type")
      .eq("status", "active")
      .in("suburb", suburbs)
      .order("created_at", { ascending: false })
      .limit(3),

    supabase
      .from("events")
      .select("id, slug, title, category, suburb, location_name, event_date")
      .eq("status", "approved")
      .in("suburb", suburbs)
      .order("event_date", { ascending: true })
      .limit(3),

    supabase
      .from("community_posts")
      .select("id, title, category, content")
      .eq("status", "approved")
      .or(
        suburbs
          .map((suburb) => `title.ilike.%${suburb}%,content.ilike.%${suburb}%`)
          .join(","),
      )
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  return {
    suburbs,
    jobs: jobs.data || [],
    events: events.data || [],
    posts: posts.data || [],
  };
}