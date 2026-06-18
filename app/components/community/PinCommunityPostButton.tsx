"use client";

import { Pin } from "lucide-react";
import Swal from "sweetalert2";
import { toggleCommunityPostPinned } from "@/app/actions/communityPinActions";

export default function PinCommunityPostButton({
  postId,
  pinned,
}: {
  postId: string;
  pinned: boolean;
}) {
  async function handleClick() {
    const result = await toggleCommunityPostPinned(postId, pinned);

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
      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
        pinned
          ? "bg-yellow-300 text-[#160524] hover:bg-yellow-200"
          : "border border-yellow-300/20 bg-yellow-300/10 text-yellow-200 hover:bg-yellow-300/20"
      }`}
    >
      <Pin className={`mr-1 inline h-3 w-3 ${pinned ? "fill-[#160524]" : ""}`} />
      {pinned ? "Pinned" : "Pin"}
    </button>
  );
}