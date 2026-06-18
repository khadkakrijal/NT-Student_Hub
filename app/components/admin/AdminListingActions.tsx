"use client";

import Swal from "sweetalert2";
import {
  approveListing,
  deleteListing,
  rejectListing,
} from "@/app/actions/adminActions";

export default function AdminListingActions({
  listingId,
  status,
}: {
  listingId: string;
  status: string;
}) {
  async function handleApprove() {
    const result = await approveListing(listingId);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Approved" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  async function handleReject() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Reject listing?",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder:
        "Example: Please upload clearer room photos or add complete contact details.",
      inputAttributes: {
        "aria-label": "Reason for rejection",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "Please enter a rejection reason.";
        }
      },
    });

    if (!confirm.isConfirmed) return;

    const result = await rejectListing(listingId, confirm.value);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Rejected" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }
  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete listing?",
      text: "This cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteListing(listingId);

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
      {status !== "approved" && (
        <button
          onClick={handleApprove}
          className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-400"
        >
          Approve
        </button>
      )}

      {status !== "rejected" && (
        <button
          onClick={handleReject}
          className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-yellow-400"
        >
          Reject
        </button>
      )}

      <button
        onClick={handleDelete}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-400"
      >
        Delete
      </button>
    </div>
  );
}
