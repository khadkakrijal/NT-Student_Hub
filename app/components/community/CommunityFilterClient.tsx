"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  MessagesSquare,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import SaveButton from "@/app/components/favorites/SaveButton";

type CommunityPost = {
  id: string;
  title: string;
  content: string;
  category: string;
  status?: string | null;
  pinned?: boolean | null;
  profiles?: {
    id: string;
    full_name: string | null;
  } | null;
  community_replies?: {
    status: string;
  }[];
};

export default function CommunityFilterClient({
  posts,
  savedCommunityIds = [],
}: {
  posts: CommunityPost[];
  savedCommunityIds?: string[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<"pinned" | "latest" | "mostReplies">(
    "pinned",
  );

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
      const keyword = search.toLowerCase();
      const cleanContent = stripHtml(post.content).toLowerCase();

      const matchesSearch =
        !keyword ||
        post.title.toLowerCase().includes(keyword) ||
        post.category.toLowerCase().includes(keyword) ||
        cleanContent.includes(keyword) ||
        post.profiles?.full_name?.toLowerCase().includes(keyword);

      const matchesCategory = !category || post.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "pinned") {
      return [...filtered].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
    }

    if (sortBy === "mostReplies") {
      return [...filtered].sort(
        (a, b) => getApprovedReplyCount(b) - getApprovedReplyCount(a),
      );
    }

    return filtered;
  }, [posts, search, category, sortBy]);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSortBy("latest");
  }

  return (
    <>
      <div className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2 text-fuchsia-300">
          <SlidersHorizontal className="h-5 w-5" />
          <p className="font-bold">Filter discussions</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-100/45" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, category, content..."
              className="input-style !pl-11"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "latest" | "mostReplies")
            }
            className="input-style bg-[#1d0f33] text-white"
          >
            <option value="pinned">Pinned first</option>
            <option value="latest">Latest</option>
            <option value="mostReplies">Most replies</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-violet-50/60">
            Showing{" "}
            <span className="font-bold text-fuchsia-300">
              {filteredPosts.length}
            </span>{" "}
            of {posts.length} discussions
          </p>

          <button
            onClick={clearFilters}
            className="rounded-full border border-violet-100/10 px-4 py-2 text-sm font-semibold text-violet-50/80 transition hover:bg-white/10"
          >
            Clear filters
          </button>
        </div>
      </div>

      <section className="mt-10 grid gap-6">
        {filteredPosts.map((post) => {
          const replyCount = getApprovedReplyCount(post);

          return (
            <div
              key={post.id}
              className="group rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                      {post.category}
                    </span>
                    {post.pinned && (
                      <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-[#160524]">
                        Pinned
                      </span>
                    )}

                    <SaveButton
                      itemId={post.id}
                      itemType="community"
                      initialSaved={savedCommunityIds.includes(post.id)}
                    />
                  </div>

                  <Link href={`/community/${post.id}`}>
                    <h2 className="mt-4 text-2xl font-black text-white transition hover:text-fuchsia-200">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="mt-2 text-sm text-violet-50/55">
                    Posted by{" "}
                    {post.profiles?.id ? (
                      <Link
                        href={`/users/${post.profiles.id}`}
                        className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200 hover:underline"
                      >
                        {post.profiles.full_name || "Student"}
                      </Link>
                    ) : (
                      "Student"
                    )}
                  </p>

                  <Link href={`/community/${post.id}`}>
                    <div
                      className="mt-4 line-clamp-3 text-sm leading-7 text-violet-50/70"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </Link>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-white/[0.05] px-4 py-3 text-sm text-violet-50/70">
                  <MessageCircle className="h-4 w-4 text-fuchsia-300" />
                  {replyCount} replies
                </div>
              </div>

              <Link
                href={`/community/${post.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300"
              >
                View discussion <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}

        {!filteredPosts.length && (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
            <MessagesSquare className="mx-auto h-14 w-14 text-fuchsia-300" />

            <h2 className="mt-5 text-2xl font-black">
              No matching discussions
            </h2>

            <p className="mt-2 text-violet-50/70">
              Try changing your filters or clearing them.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

function getApprovedReplyCount(post: CommunityPost) {
  return (
    post.community_replies?.filter((reply) => reply.status === "approved")
      .length || 0
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>?/gm, "");
}
