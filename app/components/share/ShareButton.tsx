"use client";

import { Share2 } from "lucide-react";
import Swal from "sweetalert2";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        text: text || title,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);

    Swal.fire({
      icon: "success",
      title: "Link copied",
      text: "You can now share this link.",
      timer: 1300,
      showConfirmButton: false,
      background: "#1d0f33",
      color: "#fff",
    });
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center rounded-full border border-violet-100/15 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
    >
      <Share2 className="mr-1 h-3.5 w-3.5" />
      Share
    </button>
  );
}