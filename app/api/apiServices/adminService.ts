import { createClient } from "@/app/lib/supabase/server";

export async function getAdminStats() {
  const supabase = await createClient();

  const { count: totalListings } = await supabase
    .from("accommodation_listings")
    .select("*", { count: "exact", head: true });

  const { count: pendingListings } = await supabase
    .from("accommodation_listings")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: approvedListings } = await supabase
    .from("accommodation_listings")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  return {
    totalListings: totalListings || 0,
    pendingListings: pendingListings || 0,
    approvedListings: approvedListings || 0,
    totalUsers: totalUsers || 0,
  };
}

export async function getAllUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone, university, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get all users error:", error.message);
    return [];
  }

  return data;
}

export async function getAllListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(
      `
      *,
      profiles:host_id (
        id,
        full_name,
        email,
        phone,
        role
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get all listings error:", error.message);
    return [];
  }

  return data;
}

export async function getPendingListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("accommodation_listings")
    .select(
      `
      *,
      profiles:host_id (
        id,
        full_name,
        email,
        phone,
        role
      )
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get pending listings error:", error.message);
    return [];
  }

  return data;
}
