"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

export async function updateMyListing(input: {
  id: string;
  title: string;
  description: string;
  suburb: string;
  rent_per_week: number;
  bond_amount: number | null;
  available_from: string | null;
  room_type: string | null;
  furnished: boolean;
  bills_included: boolean;
  gender_preference: string | null;
  contact_method: string | null;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "You must be logged in." };
  }

  const { error } = await supabase
    .from("accommodation_listings")
    .update({
      title: input.title,
      description: input.description || null,
      suburb: input.suburb,
      rent_per_week: input.rent_per_week,
      bond_amount: input.bond_amount,
      available_from: input.available_from,
      room_type: input.room_type,
      furnished: input.furnished,
      bills_included: input.bills_included,
      gender_preference: input.gender_preference,
      contact_method: input.contact_method,
      status: "pending",
      rejection_reason: null,
    })
    .eq("id", input.id)
    .eq("host_id", user.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/my-listings");
  revalidatePath("/listings");

  return {
    success: true,
    message: "Listing updated and sent for admin review again.",
  };
}

export async function deleteMyListing(listingId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "You must be logged in." };
  }

  const { error } = await supabase
    .from("accommodation_listings")
    .delete()
    .eq("id", listingId)
    .eq("host_id", user.id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/my-listings");
  revalidatePath("/listings");

  return { success: true, message: "Listing deleted successfully." };
}
