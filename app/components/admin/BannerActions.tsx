"use client";

import Swal from "sweetalert2";
import {
  deleteBanner,
  toggleBannerActive,
} from "@/app/actions/bannerActions";

export default function BannerActions({ banner }: { banner: any }) {
  async function handleToggle() {
    const result = await toggleBannerActive(banner.id, banner.is_active);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Done" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete banner?",
      text: "This cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteBanner(banner.id);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Deleted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleToggle}
        className="rounded-full border border-violet-100/15 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
      >
        {banner.is_active ? "Deactivate" : "Activate"}
      </button>

      <button
        onClick={handleDelete}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-400"
      >
        Delete
      </button>
    </div>
  );
}