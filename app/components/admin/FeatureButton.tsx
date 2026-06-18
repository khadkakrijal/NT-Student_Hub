"use client";

import { Star } from "lucide-react";
import Swal from "sweetalert2";
import { toggleFeaturedItem } from "@/app/actions/featuredActions";

type FeaturedType = "listing" | "job" | "event" | "community";

export default function FeatureButton({
  itemId,
  itemType,
  featured,
}: {
  itemId: string;
  itemType: FeaturedType;
  featured: boolean;
}) {
  async function handleClick() {
    const result = await toggleFeaturedItem(itemId, itemType, featured);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Done" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-bold transition ${
        featured
          ? "bg-yellow-300 text-[#160524] hover:bg-yellow-200"
          : "border border-yellow-300/20 bg-yellow-300/10 text-yellow-200 hover:bg-yellow-300/20"
      }`}
    >
      <Star className={`h-3.5 w-3.5 ${featured ? "fill-[#160524]" : ""}`} />
      {featured ? "Featured" : "Feature"}
    </button>
  );
}