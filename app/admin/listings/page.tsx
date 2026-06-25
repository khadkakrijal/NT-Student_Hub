import Image from "next/image";
import { getListingsForCurrentUser } from "@/app/api/apiServices/listingService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import AddAccommodationDialog from "@/app/components/listings/AddAccommodationDialog";
import AdminListingActions from "@/app/components/admin/AdminListingActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FeatureButton from "@/app/components/admin/FeatureButton";

export default async function ListingsPage() {
  const listings = await getListingsForCurrentUser();
  const profile = await getCurrentProfile();
  const isAdmin = profile?.role === "admin";

  return (
    <main className=" bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-16 ">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Housing
            </p>

            <h1 className="mt-3 text-2xl font-black">Student Accommodation</h1>

            <p className="mt-3 max-w-2xl text-violet-50/70">
              {isAdmin
                ? "Admin view: showing all accommodation listings."
                : "Browse approved student-friendly accommodation listings across Darwin and the NT."}
            </p>
          </div>

          <AddAccommodationDialog />
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-violet-100/10 hover:bg-transparent">
                  <TableHead className="text-violet-100/70">
                    Accommodation
                  </TableHead>
                  <TableHead className="text-violet-100/70">Suburb</TableHead>
                  <TableHead className="text-violet-100/70">Rent</TableHead>
                  <TableHead className="text-violet-100/70">Status</TableHead>
                  {isAdmin && (
                    <TableHead className="text-violet-100/70">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {listings.map((listing) => {
                  const imageUrl = listing.listing_images?.[0]?.image_url;

                  return (
                    <TableRow
                      key={listing.id}
                      className="border-violet-100/10 hover:bg-white/[0.04]"
                    >
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20">
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-white">
                              {listing.title}
                            </p>
                            {listing.featured && (
                              <p className="mt-1 w-fit rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-[#160524]">
                                Featured
                              </p>
                            )}
                            <p className="text-xs text-violet-50/60">
                              {listing.room_type || "Accommodation"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="text-violet-50/75">
                        {listing.suburb}
                      </TableCell>

                      <TableCell className="font-black text-fuchsia-300">
                        ${listing.rent_per_week}/week
                      </TableCell>

                      <TableCell>
                        <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold capitalize text-fuchsia-200">
                          {listing.status}
                        </span>
                      </TableCell>

                      {isAdmin && (
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <FeatureButton
                              itemId={listing.id}
                              itemType="listing"
                              featured={listing.featured || false}
                            />

                            <AdminListingActions
                              listingId={listing.id}
                              status={listing.status}
                            />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}

                {!listings.length && (
                  <TableRow>
                    <TableCell
                      colSpan={isAdmin ? 5 : 4}
                      className="py-12 text-center"
                    >
                      No listings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
