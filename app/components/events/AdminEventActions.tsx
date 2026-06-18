"use client";

import Swal from "sweetalert2";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import {
  approveEvent,
  deleteEventAdmin,
  rejectEvent,
} from "@/app/actions/eventActions";

export default function AdminEventActions({ eventId }: { eventId: string }) {
  async function handleApprove() {
    const result = await approveEvent(eventId);
    showResult(result);
  }

  async function handleReject() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Reject event?",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Explain what needs to be fixed...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      inputValidator: (value) => {
        if (!value?.trim()) return "Please enter a rejection reason.";
      },
    });

    if (!confirm.isConfirmed) return;

    const result = await rejectEvent(eventId, confirm.value);
    showResult(result);
  }

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

    const result = await deleteEventAdmin(eventId);
    showResult(result);
  }

  function showResult(result: { success: boolean; message: string }) {
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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleApprove}
        className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-400"
      >
        <CheckCircle2 className="mr-1 inline h-3 w-3" />
        Approve
      </button>

      <button
        onClick={handleReject}
        className="rounded-full bg-yellow-500 px-3 py-2 text-xs font-bold text-[#160524] hover:bg-yellow-400"
      >
        <XCircle className="mr-1 inline h-3 w-3" />
        Reject
      </button>

      <button
        onClick={handleDelete}
        className="rounded-full bg-red-500 px-3 py-2 text-xs font-bold text-white hover:bg-red-400"
      >
        <Trash2 className="mr-1 inline h-3 w-3" />
        Delete
      </button>
    </div>
  );
}