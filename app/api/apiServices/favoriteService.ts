import { createClient } from "@/app/lib/supabase/server";

export async function getMyFavorites() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      listings: [],
      events: [],
      jobs: [],
      posts: [],
    };
  }

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const listingIds =
    favorites
      ?.filter((item) => item.item_type === "listing")
      .map((item) => item.item_id) || [];

  const eventIds =
    favorites
      ?.filter((item) => item.item_type === "event")
      .map((item) => item.item_id) || [];

  const jobIds =
    favorites
      ?.filter((item) => item.item_type === "job")
      .map((item) => item.item_id) || [];

  const postIds =
    favorites
      ?.filter((item) => item.item_type === "community")
      .map((item) => item.item_id) || [];

  const [listings, events, jobs, posts] = await Promise.all([
    listingIds.length
      ? supabase.from("accommodation_listings").select("*").in("id", listingIds)
      : Promise.resolve({ data: [] }),

    eventIds.length
      ? supabase.from("events").select("*").in("id", eventIds)
      : Promise.resolve({ data: [] }),

    jobIds.length
      ? supabase.from("jobs").select("*").in("id", jobIds)
      : Promise.resolve({ data: [] }),

    postIds.length
      ? supabase.from("community_posts").select("*").in("id", postIds)
      : Promise.resolve({ data: [] }),
  ]);

  return {
    listings: listings.data || [],
    events: events.data || [],
    jobs: jobs.data || [],
    posts: posts.data || [],
  };
}

export async function isItemSaved(
  itemId: string,
  itemType: "listing" | "event" | "job" | "community",
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .maybeSingle();

  return !!data;
}

export async function getSavedItemIds(
  itemType: "listing" | "event" | "job" | "community",
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("favorites")
    .select("item_id")
    .eq("user_id", user.id)
    .eq("item_type", itemType);

  return data?.map((item) => item.item_id) || [];
}
