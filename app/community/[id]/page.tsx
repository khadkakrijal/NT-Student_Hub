import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, LogIn, MessageCircle, UserPlus } from "lucide-react";

import CreateReplyForm from "@/app/components/community/CreateReplyForm";
import RecentlyViewedTracker from "@/app/components/recently-viewed/RecentlyViewedTracker";
import SaveButton from "@/app/components/favorites/SaveButton";
import ShareButton from "@/app/components/share/ShareButton";
import ReportButton from "@/app/components/reports/ReportButton";

import {
  getApprovedRepliesByPostId,
  getCommunityPostById,
} from "@/app/api/apiServices/communityService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityPostDetailPage({ params }: PageProps) {
  const { id } = await params;

  const post = await getCommunityPostById(id);
  if (!post) notFound();

  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/auth/login?redirectTo=/community/${id}`);
  }

  const replies = await getApprovedRepliesByPostId(id);
  const savedCommunityIds = await getSavedItemIds("community");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <RecentlyViewedTracker
        item={{
          id: post.id,
          type: "community",
          title: post.title,
          subtitle: post.category,
          href: `/community/${post.id}`,
        }}
      />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/community"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to community
        </Link>

        <section className="rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
          <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
            {post.category}
          </span>

          {post.pinned && (
            <span className="ml-2 rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-[#160524]">
              Pinned
            </span>
          )}

          <h1 className="mt-5 text-2xl font-black md:text-2xl">{post.title}</h1>

          <p className="mt-3 text-sm text-violet-50/55">
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

          <div className="mt-6 flex flex-wrap gap-3">
            <SaveButton
              itemId={post.id}
              itemType="community"
              initialSaved={savedCommunityIds.includes(post.id)}
            />

            <ShareButton
              title={post.title}
              text={`Check out this community discussion on NT Student Hub: ${post.title}`}
            />

            <ReportButton itemId={post.id} itemType="community" />
          </div>

          <div
            className="prose prose-invert mt-8 max-w-none leading-8 text-violet-50/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        <section className="mt-8 space-y-5">
          <h2 className="flex items-center gap-2 text-3xl font-black">
            <MessageCircle className="h-7 w-7 text-fuchsia-300" />
            Replies
          </h2>

          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
            >
              <p className="text-sm text-violet-50/55">
                Replied by{" "}
                {reply.profiles?.id ? (
                  <Link
                    href={`/users/${reply.profiles.id}`}
                    className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200 hover:underline"
                  >
                    {reply.profiles.full_name || "Student"}
                  </Link>
                ) : (
                  "Student"
                )}
              </p>

              <div
                className="prose prose-invert mt-4 max-w-none text-violet-50/75"
                dangerouslySetInnerHTML={{ __html: reply.content }}
              />
            </div>
          ))}

          {!replies.length && (
            <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 text-center text-violet-50/70">
              No approved replies yet.
            </div>
          )}
        </section>

        <section className="mt-8">
          <CreateReplyForm postId={post.id} />
        </section>
      </div>
    </main>
  );
}
