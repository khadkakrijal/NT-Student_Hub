"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { Star } from "lucide-react";
import { toggleEventInterest } from "@/app/actions/eventActions";

export default function EventInterestButton({
  eventId,
  interested,
  count,
}: {
  eventId: string;
  interested: boolean;
  count: number;
}) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await toggleEventInterest(eventId);

      if (!result.success) {
        Swal.fire({
          icon: "error",
          title: "Login required",
          text: result.message,
          background: "#1d0f33",
          color: "#fff",
          confirmButtonColor: "#a78bfa",
        });
      }
    });
  }

  return (
    <button
      disabled={pending}
      onClick={handleClick}
      className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-bold transition ${
        interested
          ? "bg-yellow-400 text-[#160524] hover:bg-yellow-300"
          : "border border-violet-100/15 bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <Star
        className={`mr-2 h-4 w-4 ${interested ? "fill-[#160524]" : ""}`}
      />
      {interested ? "Interested" : "I'm Interested"} · {count}
    </button>
  );
}