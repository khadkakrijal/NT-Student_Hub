"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Home,
  MessageCircle,
} from "lucide-react";
import type { RecentlyViewedItem } from "./RecentlyViewedTracker";

const STORAGE_KEY = "nt_student_hub_recently_viewed";

const iconMap = {
  listing: Home,
  job: Briefcase,
  event: CalendarDays,
  community: MessageCircle,
};

export default function RecentlyViewedSection() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setItems(stored ? JSON.parse(stored) : []);
  }, []);

  if (!items.length) return null;

  return (
    <section className="mt-8 rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-black">Recently Viewed</h2>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = iconMap[item.type];

          return (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              className="rounded-2xl bg-white/[0.05] p-4 transition hover:bg-white/[0.09]"
            >
              <Icon className="h-6 w-6 text-fuchsia-300" />

              <p className="mt-3 line-clamp-2 font-bold text-white">
                {item.title}
              </p>

              <p className="mt-2 text-sm capitalize text-violet-50/60">
                {item.subtitle || item.type}
              </p>

              <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-fuchsia-300">
                Open <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
