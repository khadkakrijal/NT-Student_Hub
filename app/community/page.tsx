import Link from "next/link";
import {
  ExternalLink,
  Users,
  LogIn,
  MessagesSquare,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import CreatePostDialog from "@/app/components/community/CreatePostDialog";
import CommunityFilterClient from "@/app/components/community/CommunityFilterClient";
import { getApprovedCommunityPosts } from "@/app/api/apiServices/communityService";
import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import { getSavedItemIds } from "@/app/api/apiServices/favoriteService";

export default async function CommunityPage() {
  const posts = await getApprovedCommunityPosts();
  const profile = await getCurrentProfile();
  const savedCommunityIds = await getSavedItemIds("community");

  const canCreatePost = !!profile;

  const facebookGroups = [
    {
      name: "Darwin ma Kaam",
      purpose:
        "Jobs, casual work, part-time opportunities and local work updates.",
      url: "https://www.facebook.com/groups/4094960673876115",
      tag: "Jobs",
    },
    {
      name: "Nepalese in Darwin",
      purpose:
        "Rooms, community help, events, questions and local student support.",
      url: "https://www.facebook.com/groups/345952839131114",
      tag: "Community",
    },
    {
      name: "Nepalese in Darwin B",
      purpose:
        "Rooms, community help, events, questions and local student support.",
      url: "https://www.facebook.com/groups/1244591956016132",
      tag: "Community",
    },
    {
      name: "NT State Nomination, EOI, Visa 491 and 190",
      purpose: "Visa, migration, EOI and NT nomination related discussions.",
      url: "https://www.facebook.com/groups/822016559798310/?ref=share&mibextid=wwXIfr&rdid=7JhWe6wpBHe30XpO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F1D3SZjEkcV%2F%3Fmibextid%3DwwXIfr#",
      tag: "Visa",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-25">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <MessagesSquare className="relative h-10 w-10 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Community Hub
          </p>

          <h1 className="relative mt-4 max-w-5xl text-2xl font-black leading-tight md:text-2xl">
            Ask, share, and connect with students in Darwin.
          </h1>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
            Post questions about accommodation, jobs, suburbs, transport,
            university life, food, safety, events, and student experiences.
            Everything is reviewed before publishing.
          </p>

          <div className="relative mt-8 flex flex-wrap gap-4">
            {canCreatePost ? (
              <CreatePostDialog />
            ) : (
              <Link
                href="/auth/login"
                className="inline-flex items-center rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login to Create Post
              </Link>
            )}

            <div className="flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/[0.06] px-5 py-3 text-sm text-violet-50/75">
              <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
              Admin approved content only
            </div>
          </div>
        </section>
        <section className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Helpful Facebook Groups
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                Find jobs, rooms, visa help and community updates
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-50/70">
                These Facebook groups may help students connect with the local
                Nepalese community, find rooms, look for casual jobs, and ask
                migration-related questions.
              </p>
            </div>

            <div className="rounded-full border border-yellow-300/20 bg-yellow-400/10 px-4 py-2 text-xs font-semibold text-yellow-100">
              Always verify information before making decisions
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {facebookGroups.map((group) => (
              <a
                key={group.name}
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.7rem] border border-violet-100/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.08]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20">
                    <FaFacebook className="h-6 w-6 text-[#1877F2]" />
                  </div>

                  <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                    {group.tag}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-black text-white">
                  {group.name}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-7 text-violet-50/70">
                  {group.purpose}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-fuchsia-300">
                  Open Facebook Group
                  <ExternalLink className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </section>
        {!canCreatePost && (
          <section className="mt-8 rounded-[2rem] border border-fuchsia-300/15 bg-gradient-to-r from-violet-400/15 to-fuchsia-400/15 p-6 backdrop-blur-xl md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-black text-white">
                  Join the NT Student Community
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-violet-50/70">
                  You can read discussions as a guest. Sign in to create posts,
                  reply to students, save discussions, and receive updates.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center rounded-full bg-violet-400 px-5 py-3 text-sm font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="inline-flex items-center rounded-full border border-violet-100/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </div>
            </div>
          </section>
        )}

        <CommunityFilterClient
          posts={posts}
          savedCommunityIds={savedCommunityIds}
        />

        {!posts.length && (
          <section className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center">
            <MessagesSquare className="mx-auto h-14 w-14 text-fuchsia-300" />

            <h2 className="mt-5 text-2xl font-black">No discussions yet</h2>

            <p className="mt-2 text-violet-50/70">
              Be the first to submit a community post for approval.
            </p>

            <div className="mt-6">
              {canCreatePost ? (
                <CreatePostDialog />
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center rounded-full bg-violet-400 px-6 py-3 font-bold text-[#160524] transition hover:bg-violet-300"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login to Create Your First Post
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
