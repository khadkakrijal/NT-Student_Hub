"use client";

import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteMyEvent } from "@/app/actions/eventActions";

export default function DeleteMyEventButton({ eventId }: { eventId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete event?",
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

    const result = await deleteMyEvent(eventId);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Deleted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-400"
    >
      <Trash2 className="mr-1 inline h-3 w-3" />
      Delete
    </button>
  );
}