"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";
import { createNotification } from "./notificationActions";

type UserRole = "student" | "host" | "admin";

type UpdateUserProfileInput = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  university: string | null;
  role: UserRole;
};

async function isCurrentUserAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.role === "admin";
}

export async function approveListing(listingId: string) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can approve listings." };
  }

  const supabase = await createClient();

  const { data: listing } = await supabase
    .from("accommodation_listings")
    .select("id, title, host_id")
    .eq("id", listingId)
    .maybeSingle();

  const { error } = await supabase
    .from("accommodation_listings")
    .update({
      status: "approved",
      rejection_reason: null,
    })
    .eq("id", listingId);

  if (error) return { success: false, message: error.message };

  if (listing?.host_id) {
    await createNotification({
      userId: listing.host_id,
      title: "Accommodation approved",
      message: `Your listing "${listing.title}" has been approved.`,
      type: "success",
      link: "/listings",
    });
  }

  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  revalidatePath("/my-listings");

  return { success: true, message: "Listing approved successfully." };
}

export async function rejectListing(listingId: string, reason: string) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can reject listings." };
  }

  if (!reason.trim()) {
    return { success: false, message: "Rejection reason is required." };
  }

  const supabase = await createClient();

  const { data: listing } = await supabase
    .from("accommodation_listings")
    .select("id, title, host_id")
    .eq("id", listingId)
    .maybeSingle();

  const { error } = await supabase
    .from("accommodation_listings")
    .update({
      status: "rejected",
      rejection_reason: reason,
    })
    .eq("id", listingId);

  if (error) return { success: false, message: error.message };

  if (listing?.host_id) {
    await createNotification({
      userId: listing.host_id,
      title: "Accommodation rejected",
      message: `Your listing "${listing.title}" was rejected. Reason: ${reason}`,
      type: "warning",
      link: "/listings",
    });
  }

  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  revalidatePath("/my-listings");

  return { success: true, message: "Listing rejected successfully." };
}

export async function deleteListing(listingId: string) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can delete listings." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("accommodation_listings")
    .delete()
    .eq("id", listingId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/listings");
  revalidatePath("/listings");

  return { success: true, message: "Listing deleted successfully." };
}

export async function updateUserRole(userId: string, role: UserRole) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can update user roles." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/users");

  return { success: true, message: "User role updated successfully." };
}

export async function updateUserProfile(input: UpdateUserProfileInput) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can update users." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      university: input.role === "student" ? input.university : null,
      role: input.role,
    })
    .eq("id", input.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/users");
  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return { success: true, message: "User updated successfully." };
}

export async function deleteUserProfile(userId: string) {
  const isAdmin = await isCurrentUserAdmin();

  if (!isAdmin) {
    return { success: false, message: "Only admins can delete users." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/users");

  return {
    success: true,
    message:
      "User profile deleted successfully. Note: Supabase Auth account is not deleted.",
  };
}
