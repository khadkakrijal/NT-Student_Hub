"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeCommunityPreview({ posts }: { posts: any[] }) {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Community
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Ask questions before you arrive
            </h2>
            <p className="mt-4 max-w-2xl text-violet-50/70">
              Read student discussions about housing, jobs, suburbs, transport,
              food, safety, and life in Darwin.
            </p>
          </div>

          <Link
            href="/community"
            className="rounded-full border border-violet-100/15 px-5 py-3 text-sm font-bold text-violet-50 transition hover:bg-white/10"
          >
            View community
          </Link>
        </div>

        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post, index) => {
              const replyCount =
                post.community_replies?.filter(
                  (reply: { status: string }) => reply.status === "approved",
                ).length || 0;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={`/community/${post.id}`}
                    className="block h-full rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:border-fuchsia-300/40"
                  >
                    <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                      {post.category}
                    </span>

                    <h3 className="mt-4 text-xl font-black">{post.title}</h3>

                    <p className="mt-2 text-sm text-violet-50/55">
                      Posted by{" "}
                      {post.profiles?.id ? (
                        <span onClick={(e) => e.stopPropagation()}>
                          <Link
                            href={`/users/${post.profiles.id}`}
                            className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200 hover:underline"
                          >
                            {post.profiles.full_name || "Student"}
                          </Link>
                        </span>
                      ) : (
                        "Student"
                      )}
                    </p>

                    <div
                      className="mt-4 line-clamp-3 text-sm leading-7 text-violet-50/70"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-5 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm text-violet-50/70">
                        <MessageCircle className="h-4 w-4 text-fuchsia-300" />
                        {replyCount} replies
                      </p>

                      <ArrowRight className="h-4 w-4 text-fuchsia-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-10 text-center">
            <MessagesSquare className="mx-auto h-12 w-12 text-fuchsia-300" />
            <h3 className="mt-4 text-2xl font-black">No discussions yet</h3>
            <p className="mt-2 text-violet-50/70">
              Approved community posts will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
