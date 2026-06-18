"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type Props = {
  stats: {
    listings: number;
    jobs: number;
    events: number;
    posts: number;
  };
};

const items = [
  {
    key: "listings",
    label: "Housing Listings",
    description: "Approved student-friendly rooms and accommodation.",
    icon: Home,
  },
  {
    key: "jobs",
    label: "Student Jobs",
    description: "Active job opportunities across Darwin and NT.",
    icon: Briefcase,
  },
  {
    key: "events",
    label: "Events",
    description: "Community, student, cultural and sports events.",
    icon: CalendarDays,
  },
  {
    key: "posts",
    label: "Community Posts",
    description: "Approved discussions from students and locals.",
    icon: MessageCircle,
  },
] as const;

export default function HomePlatformStats({ stats }: Props) {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/[0.06] px-4 py-2 text-sm text-fuchsia-300">
            <Sparkles className="h-4 w-4" />
            Platform Activity
          </div>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Built for NT students.
          </h2>

          <p className="mt-4 max-w-2xl text-violet-50/70">
            Explore housing, jobs, events and community support in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const value = stats[item.key];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl"
              >
                <item.icon className="h-8 w-8 text-fuchsia-300" />

                <p className="mt-5 text-5xl font-black text-white">
                  {value}
                </p>

                <h3 className="mt-3 text-xl font-black">{item.label}</h3>

                <p className="mt-3 text-sm leading-7 text-violet-50/65">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}