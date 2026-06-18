import { createClient } from "@/app/lib/supabase/server";

export async function getAdminAnalytics() {
  const supabase = await createClient();

  const [
    totalUsers,
    students,
    hosts,
    admins,

    totalListings,
    pendingListings,
    approvedListings,
    rejectedListings,
    featuredListings,

    totalJobs,
    activeJobs,
    closedJobs,
    draftJobs,
    featuredJobs,

    totalEvents,
    pendingEvents,
    approvedEvents,
    rejectedEvents,
    featuredEvents,

    totalPosts,
    pendingPosts,
    approvedPosts,
    rejectedPosts,
    featuredPosts,

    totalReplies,
    pendingReplies,
    approvedReplies,
    rejectedReplies,
  ] = await Promise.all([
    getCount(supabase, "profiles"),
    getCount(supabase, "profiles", "role", "student"),
    getCount(supabase, "profiles", "role", "host"),
    getCount(supabase, "profiles", "role", "admin"),

    getCount(supabase, "accommodation_listings"),
    getCount(supabase, "accommodation_listings", "status", "pending"),
    getCount(supabase, "accommodation_listings", "status", "approved"),
    getCount(supabase, "accommodation_listings", "status", "rejected"),
    getCount(supabase, "accommodation_listings", "featured", true),

    getCount(supabase, "jobs"),
    getCount(supabase, "jobs", "status", "active"),
    getCount(supabase, "jobs", "status", "closed"),
    getCount(supabase, "jobs", "status", "draft"),
    getCount(supabase, "jobs", "featured", true),

    getCount(supabase, "events"),
    getCount(supabase, "events", "status", "pending"),
    getCount(supabase, "events", "status", "approved"),
    getCount(supabase, "events", "status", "rejected"),
    getCount(supabase, "events", "featured", true),

    getCount(supabase, "community_posts"),
    getCount(supabase, "community_posts", "status", "pending"),
    getCount(supabase, "community_posts", "status", "approved"),
    getCount(supabase, "community_posts", "status", "rejected"),
    getCount(supabase, "community_posts", "featured", true),

    getCount(supabase, "community_replies"),
    getCount(supabase, "community_replies", "status", "pending"),
    getCount(supabase, "community_replies", "status", "approved"),
    getCount(supabase, "community_replies", "status", "rejected"),
  ]);

  const pendingTotal =
    pendingListings + pendingEvents + pendingPosts + pendingReplies;

  return {
    users: { total: totalUsers, students, hosts, admins },
    listings: {
      total: totalListings,
      pending: pendingListings,
      approved: approvedListings,
      rejected: rejectedListings,
      featured: featuredListings,
    },
    jobs: {
      total: totalJobs,
      active: activeJobs,
      closed: closedJobs,
      draft: draftJobs,
      featured: featuredJobs,
    },
    events: {
      total: totalEvents,
      pending: pendingEvents,
      approved: approvedEvents,
      rejected: rejectedEvents,
      featured: featuredEvents,
    },
    community: {
      posts: totalPosts,
      replies: totalReplies,
      pendingPosts,
      pendingReplies,
      approvedPosts,
      approvedReplies,
      rejectedPosts,
      rejectedReplies,
      featuredPosts,
    },
    pendingTotal,
  };
}

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  column?: string,
  value?: string | boolean,
) {
  let query = supabase.from(table).select("*", {
    count: "exact",
    head: true,
  });

  if (column && value !== undefined) {
    query = query.eq(column, value);
  }

  const { count, error } = await query;

  if (error) {
    console.error(`Count error for ${table}:`, error.message);
    return 0;
  }

  return count || 0;
}

export async function getAdminLatestItems() {
  const supabase = await createClient();

  const [latestListings, latestEvents, latestPosts, latestJobs] =
    await Promise.all([
      supabase
        .from("accommodation_listings")
        .select("id, title, suburb, rent_per_week, status, featured, created_at")
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("events")
        .select("id, title, suburb, status, featured, created_at")
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("community_posts")
        .select("id, title, category, status, featured, created_at")
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("jobs")
        .select("id, title, company_name, suburb, status, featured, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  return {
    listings: latestListings.data || [],
    events: latestEvents.data || [],
    posts: latestPosts.data || [],
    jobs: latestJobs.data || [],
  };
}