import {
  getApprovedListings,
  getMyListings,
} from "@/app/api/apiServices/listingService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import ListingsViewClient from "@/app/components/listings/ListingsViewClient";
import { getSavedItemIds } from "../api/apiServices/favoriteService";

export default async function ListingsPage() {
  const listings = await getApprovedListings();
  const profile = await getCurrentProfile();
  const savedListingIds =  await getSavedItemIds("listing")

  const canCreateListing =
    profile?.role === "host" || profile?.role === "admin";

  const myListings = canCreateListing ? await getMyListings() : [];

  return (
    <ListingsViewClient
      listings={listings}
      myListings={myListings}
      canCreateListing={canCreateListing}
      savedListingIds={savedListingIds}
    />
  );
}