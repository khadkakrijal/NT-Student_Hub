import { createClient } from "@/app/lib/supabase/server";
import { livingPages } from "@/app/data/livingInDarwinData";

export async function globalSearch(query: string) {
  const supabase = await createClient();
  const search = query.trim();

  if (!search) {
    return {
      listings: [],
      events: [],
      jobs: [],
      posts: [],
      guides: [],
    };
  }

  const [
    listingsResult,
    eventsResult,
    jobsResult,
    postsResult,
  ] = await Promise.all([
    supabase
      .from("accommodation_listings")
      .select("id, title, description, suburb, rent_per_week, room_type, status")
      .eq("status", "approved")
      .or(
        `title.ilike.%${search}%,description.ilike.%${search}%,suburb.ilike.%${search}%,room_type.ilike.%${search}%`
      )
      .limit(8),

    supabase
      .from("events")
      .select("id, slug, title, description, category, suburb, location_name, event_date, status")
      .eq("status", "approved")
      .or(
        `title.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%,suburb.ilike.%${search}%,location_name.ilike.%${search}%`
      )
      .limit(8),

    supabase
      .from("jobs")
      .select("id, slug, title, company_name, suburb, job_type, industry, description, status")
      .eq("status", "active")
      .or(
        `title.ilike.%${search}%,company_name.ilike.%${search}%,suburb.ilike.%${search}%,job_type.ilike.%${search}%,industry.ilike.%${search}%,description.ilike.%${search}%`
      )
      .limit(8),

    supabase
      .from("community_posts")
      .select("id, title, content, category, status")
      .eq("status", "approved")
      .or(
        `title.ilike.%${search}%,content.ilike.%${search}%,category.ilike.%${search}%`
      )
      .limit(8),
  ]);

  const guides = livingPages
    .filter((page) => {
      const lowerSearch = search.toLowerCase();

      const pageText = [
        page.title,
        page.description,
        ...page.sections.flatMap((section) => [
          section.heading,
          section.summary || "",
          ...section.points,
          ...(section.studentTips || []),
          ...(section.commonMistakes || []),
          ...(section.examples || []),
        ]),
      ]
        .join(" ")
        .toLowerCase();

      return pageText.includes(lowerSearch);
    })
    .slice(0, 8);

  return {
    listings: listingsResult.data || [],
    events: eventsResult.data || [],
    jobs: jobsResult.data || [],
    posts: postsResult.data || [],
    guides,
  };
}