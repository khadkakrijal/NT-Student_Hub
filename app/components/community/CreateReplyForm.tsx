"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import RichTextEditor from "@/app/components/editor/RichTextEditor";
import { createCommunityReply } from "@/app/actions/communityActions";

export default function CreateReplyForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content || content === "<p></p>") {
      Swal.fire({
        icon: "warning",
        title: "Write a reply first",
        background: "#1d0f33",
        color: "#fff",
        confirmButtonColor: "#a78bfa",
      });
      return;
    }

    setLoading(true);

    const result = await createCommunityReply({
      postId,
      content,
    });

    setLoading(false);

    await Swal.fire({
      icon: result.success ? "success" : "error",
      title: result.success ? "Reply Submitted" : "Failed",
      text: result.message,
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
    });

    if (result.success) setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-black">Reply to this discussion</h2>
      <p className="mt-2 text-sm text-violet-50/60">
        Replies are reviewed by admin before becoming public.
      </p>

      <div className="mt-5">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <button
        disabled={loading}
        className="mt-5 rounded-2xl bg-violet-400 px-5 py-3 font-bold text-[#160524] hover:bg-violet-300 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Reply"}
      </button>
    </form>
  );
}