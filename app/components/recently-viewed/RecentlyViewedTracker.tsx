"use client";

import { useEffect } from "react";

export type RecentlyViewedItem = {
  id: string;
  type: "listing" | "job" | "event" | "community";
  title: string;
  subtitle?: string | null;
  href: string;
  image?: string | null;
};

const STORAGE_KEY = "nt_student_hub_recently_viewed";

export default function RecentlyViewedTracker({
  item,
}: {
  item: RecentlyViewedItem;
}) {
  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    const parsed: RecentlyViewedItem[] = existing ? JSON.parse(existing) : [];

    const withoutDuplicate = parsed.filter(
      (savedItem) =>
        !(savedItem.id === item.id && savedItem.type === item.type),
    );

    const updated = [item, ...withoutDuplicate].slice(0, 8);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [item]);

  return null;
}