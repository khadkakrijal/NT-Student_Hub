"use client";

import Swal from "sweetalert2";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import { deleteJob, updateJobStatus } from "@/app/actions/jobActions";

export default function AdminJobActions({
  jobId,
  status,
}: {
  jobId: string;
  status: string | null;
}) {
  async function handleStatus(newStatus: "active" | "closed" | "draft") {
    const result = await updateJobStatus(jobId, newStatus);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Updated" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete job?",
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

    const result = await deleteJob(jobId);

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
      {status !== "active" && (
        <button
          onClick={() => handleStatus("active")}
          className="rounded-full bg-emerald-500 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-400"
        >
          <CheckCircle2 className="mr-1 inline h-3 w-3" />
          Active
        </button>
      )}

      {status !== "closed" && (
        <button
          onClick={() => handleStatus("closed")}
          className="rounded-full bg-yellow-500 px-3 py-2 text-xs font-bold text-[#160524] hover:bg-yellow-400"
        >
          <XCircle className="mr-1 inline h-3 w-3" />
          Close
        </button>
      )}

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