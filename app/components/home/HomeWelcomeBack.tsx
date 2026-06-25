"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Bookmark,
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type Props = {
  fullName?: string | null;
  role?: string | null;
  stats: {
    saved: number;
    unreadNotifications: number;
    jobs: number;
    events: number;
  };
};

export default function HomeWelcomeBack({ fullName, role, stats }: Props) {
  const firstName = fullName?.split(" ")[0] || "Student";

  return (
    <section className="relative overflow-hidden px-6 py-5">
      <div className="absolute left-10 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/10 px-4 py-2 text-sm text-fuchsia-300">
                <Sparkles className="h-4 w-4" />
                Welcome back
              </div>

              <h2 className="mt-5 text-2xl font-black">Hi {firstName} 👋</h2>

              <p className="mt-4 max-w-2xl leading-8 text-violet-50/70">
                Continue exploring housing, jobs, events and student discussions
                across Darwin.
              </p>

              {role && (
                <div className="mt-6 inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-bold capitalize text-fuchsia-200">
                  {role}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-[480px]">
              <StatLink
                href="/saved"
                icon={Bookmark}
                label="Saved"
                value={stats.saved}
              />
              {/* <StatLink href="/notifications" icon={Bell} label="Unread" value={stats.unreadNotifications} /> */}
              <StatLink
                href="/jobs"
                icon={Briefcase}
                label="Jobs"
                value={stats.jobs}
              />
              <StatLink
                href="/events"
                icon={CalendarDays}
                label="Events"
                value={stats.events}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <QuickLink href="/listings" icon={Home} title="Browse Housing" />
            <QuickLink href="/jobs" icon={Briefcase} title="Find Jobs" />
            <QuickLink href="/events" icon={CalendarDays} title="View Events" />
            <QuickLink
              href="/community"
              icon={MessageCircle}
              title="Community"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-fuchsia-300/30 hover:bg-white/[0.08]"
    >
      <Icon className="h-7 w-7 text-fuchsia-300" />
      <p className="mt-4 text-sm text-violet-50/60">{label}</p>
      <p className="mt-1 text-3xl font-black text-white">{value}</p>
    </Link>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-violet-100/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-fuchsia-300/30 hover:bg-white/[0.08]"
    >
      <Icon className="h-7 w-7 text-fuchsia-300" />
      <p className="mt-4 font-bold text-white">{title}</p>
    </Link>
  );
}
