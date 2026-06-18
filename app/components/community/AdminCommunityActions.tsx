"use client";

import Swal from "sweetalert2";
import { CheckCircle2, Trash2, XCircle } from "lucide-react";
import {
  deleteCommunityPost,
  deleteCommunityReply,
  updateCommunityPostStatus,
  updateCommunityReplyStatus,
} from "@/app/actions/communityActions";

export default function AdminCommunityActions({
  type,
  id,
  postId,
}: {
  type: "post" | "reply";
  id: string;
  postId?: string;
}) {
  async function handleApprove() {
    const result =
      type === "post"
        ? await updateCommunityPostStatus(id, "approved")
        : await updateCommunityReplyStatus(id, postId!, "approved");

    showResult(result);
  }

  async function handleReject() {
    const result =
      type === "post"
        ? await updateCommunityPostStatus(id, "rejected")
        : await updateCommunityReplyStatus(id, postId!, "rejected");

    showResult(result);
  }

  async function handleDelete() {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete item?",
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

    const result =
      type === "post"
        ? await deleteCommunityPost(id)
        : await deleteCommunityReply(id, postId!);

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