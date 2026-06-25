"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Compass,
  Home,
  MessageCircle,
  PlusCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

type Role = "student" | "host" | "admin" | null;

const mainActions = [
  {
    title: "Housing",
    description:
      "Browse approved student-friendly rooms and shared accommodation.",
    href: "/listings",
    icon: Home,
  },
  {
    title: "Events",
    description:
      "Find student events, cultural programs, sports and community activities.",
    href: "/events",
    icon: CalendarDays,
  },
  {
    title: "Community",
    description:
      "Ask questions, share advice and connect with other students in Darwin.",
    href: "/community",
    icon: MessageCircle,
  },
  {
    title: "Living in Darwin",
    description:
      "Learn about suburbs, transport, food, safety, weather and student life.",
    href: "/living-in-darwin",
    icon: Compass,
  },
];

const hostActions = [
  {
    title: "Manage Accommodation",
    description:
      "Post accommodation, check approval status, edit rooms and manage listings.",
    href: "/listings",
    icon: PlusCircle,
  },
  {
    title: "Create or Manage Events",
    description:
      "Submit events, check approval status, edit details and manage your events.",
    href: "/events",
    icon: CalendarDays,
  },
];

const adminActions = [
  {
    title: "Admin Dashboard",
    description:
      "Review users, listings, events, community posts and platform activity.",
    href: "/admin",
    icon: ShieldCheck,
  },
  {
    title: "Manage Users",
    description:
      "View student, host and admin profiles registered on the platform.",
    href: "/admin/users",
    icon: Users,
  },
];

export default function HomeQuickActions({ role }: { role: Role }) {
  const canHostManage = role === "host" || role === "admin";
  const isAdmin = role === "admin";

  return (
    <section className="relative overflow-hidden px-6 py-5">
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Start here
            </p>

            <h2 className="mt-3 text-2xl font-black md:text-2xl">
              Everything you need to settle in Darwin.
            </h2>

            <p className="mt-4 max-w-3xl text-violet-50/70">
              Explore housing, events, community discussions and practical
              Darwin guides designed for international students.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {mainActions.map((action, index) => (
            <ActionCard key={action.title} action={action} index={index} />
          ))}
        </div>

        {canHostManage && (
          <div className="mt-14">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Your Tools
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Manage your submissions
              </h3>

              <p className="mt-3 max-w-2xl text-violet-50/65">
                Create, edit and track the approval status of your listings and
                events.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {hostActions.map((action, index) => (
                <ActionCard key={action.title} action={action} index={index} />
              ))}
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="mt-14">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
                Admin Tools
              </p>

              <h3 className="mt-3 text-3xl font-black">Platform management</h3>

              <p className="mt-3 max-w-2xl text-violet-50/65">
                Review pending content, manage users and keep the platform safe
                for students.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {adminActions.map((action, index) => (
                <ActionCard key={action.title} action={action} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ActionCard({
  action,
  index,
}: {
  action: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
  };
  index: number;
}) {
  const Icon = action.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link
        href={action.href}
        className="block h-full rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
      >
        <Icon className="h-8 w-8 text-fuchsia-300" />

        <h3 className="mt-5 text-2xl font-black">{action.title}</h3>

        <p className="mt-3 text-sm leading-7 text-violet-50/70">
          {action.description}
        </p>
      </Link>
    </motion.div>
  );
}
