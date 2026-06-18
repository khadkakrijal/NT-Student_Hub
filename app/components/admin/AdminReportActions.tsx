"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { updateReportStatus } from "@/app/actions/reportActions";

export default function AdminReportActions({
  reportId,
}: {
  reportId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleUpdate(
    status: "reviewed" | "dismissed" | "resolved",
  ) {
    const noteResult = await Swal.fire({
      title: `Mark as ${status}?`,
      input: "textarea",
      inputPlaceholder: "Optional admin note...",
      showCancelButton: true,
      confirmButtonText: "Update",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
      cancelButtonColor: "#6b7280",
    });

    if (!noteResult.isConfirmed) return;

    setLoading(true);

    const result = await updateReportStatus({
      reportId,
      status,
      adminNote: noteResult.value || "",
    });

    setLoading(false);

    Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Updated" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        disabled={loading}
        onClick={() => handleUpdate("reviewed")}
        className="rounded-full border border-violet-100/15 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20"
      >
        Reviewed
      </button>

      <button
        disabled={loading}
        onClick={() => handleUpdate("resolved")}
        className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-400"
      >
        Resolve
      </button>

      <button
        disabled={loading}
        onClick={() => handleUpdate("dismissed")}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-400"
      >
        Dismiss
      </button>
    </div>
  );
}