import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, HeartHandshake, Users } from "lucide-react";
import { communityClubs } from "@/app/data/communityClubs";

export default function CommunityClubsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/living-in-darwin"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-100/70 transition hover:text-fuchsia-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Student Guide
        </Link>

        <section className="relative overflow-hidden rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl md:p-12">
          <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <HeartHandshake className="relative h-11 w-11 text-fuchsia-300" />

          <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Community Connection
          </p>

          <h1 className="relative mt-4 text-2xl font-black leading-tight md:text-2xl">
            Nepalese Sports & Community Clubs
          </h1>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-violet-50/75">
            Connect with Nepalese football clubs in Darwin, meet new people,
            support local teams, and become part of the community beyond study
            and work.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {communityClubs.map((club) => (
            <a
              key={club.name}
              href={club.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2.2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
            >
              <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl transition group-hover:bg-fuchsia-500/20" />

              <div className="relative flex items-center gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-violet-100/10 bg-white/[0.08] p-3">
                  <Image
                    src={club.logo}
                    alt={club.name}
                    width={90}
                    height={90}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                    Football Club
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    {club.name}
                  </h2>
                </div>
              </div>

              <p className="relative mt-6 min-h-20 text-sm leading-7 text-violet-50/70">
                {club.description}
              </p>

              <div className="relative mt-6 flex items-center justify-between rounded-2xl border border-violet-100/10 bg-white/[0.05] px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-bold text-violet-50">
                  <Users className="h-4 w-4 text-fuchsia-300" />
                  Community club
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-fuchsia-300">
                  Facebook
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 text-center backdrop-blur-xl">
          <h2 className="text-2xl font-black">Want your club listed?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-violet-50/70">
            If your Nepalese community club or student sports group is missing,
            contact the NT Student Hub team with the club name, logo and
            official Facebook page.
          </p>
        </section>
      </div>
    </main>
  );
}
