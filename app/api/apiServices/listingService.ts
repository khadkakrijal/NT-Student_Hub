import { createClient } from "@/app/lib/supabase/server";

const listingSelect = `
  *,
  profiles!accommodation_listings_host_id_fkey (
    id,
    full_name,
    email,
    phone,
    role
  ),
  listing_images (
    id,
    image_url
  )
`;

export async function getListingsForCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase
      .from("accommodation_listings")
      .select(listingSelect)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data || [];
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  let query = supabase
    .from("accommodation_listings")
    .select(listingSelect)
    .order("created_at", { ascending: false });

  if (profile?.role !== "admin") {
    query = query.eq("status", "approved");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Get listings error:", error.message);
    return [];
  }

  return data || [];
}

export async function getApprovedListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(listingSelect)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  console.log(data, "accomodations listings=");
  if (error) {
    console.error("Get approved listings error:", error.message);
    return [];
  }

  return data || [];
}

export async function getListingById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(listingSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Get listing by ID error:", error.message);
    return null;
  }

  return data;
}

export async function getMyListings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(listingSelect)
    .eq("host_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get my listings error:", error.message);
    return [];
  }

  return data || [];
}

export async function getPendingListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(listingSelect)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get pending listings error:", error.message);
    return [];
  }

  return data || [];
}
