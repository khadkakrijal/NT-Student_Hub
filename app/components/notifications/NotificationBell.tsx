"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { markAllNotificationsAsRead } from "@/app/actions/notificationActions";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

export default function NotificationBell({
  notifications,
  unreadCount,
}: {
  notifications: Notification[];
  unreadCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [localUnreadCount, setLocalUnreadCount] = useState(unreadCount);

  async function handleMarkAllRead() {
    const result = await markAllNotificationsAsRead();

    if (result.success) {
      setLocalUnreadCount(0);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-full border border-violet-100/15 bg-white/10 p-3 text-white transition hover:bg-white/20"
      >
        <Bell className="h-5 w-5" />

        {localUnreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-400 px-1 text-xs font-black text-[#160524]">
            {localUnreadCount > 9 ? "9+" : localUnreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-[340px] overflow-hidden rounded-3xl border border-violet-100/10 bg-[#1d0f33] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-violet-100/10 p-4">
            <div>
              <p className="font-black text-white">Notifications</p>
              <p className="text-xs text-violet-50/55">
                {localUnreadCount} unread
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkAllRead}
              className="rounded-full bg-violet-400/15 px-3 py-2 text-xs font-bold text-fuchsia-200 hover:bg-violet-400/25"
            >
              <CheckCheck className="mr-1 inline h-3 w-3" />
              Mark all read
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length ? (
              notifications.map((item) => {
                const content = (
                  <div
                    className={`border-b border-violet-100/10 p-4 transition hover:bg-white/[0.05] ${
                      !item.is_read ? "bg-violet-400/10" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-violet-50/65">
                          {item.message}
                        </p>
                        <p className="mt-2 text-[11px] text-violet-50/40">
                          {formatDate(item.created_at)}
                        </p>
                      </div>

                      {!item.is_read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-300" />
                      )}
                    </div>
                  </div>
                );

                return item.link ? (
                  <Link key={item.id} href={item.link} onClick={() => setOpen(false)}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.id}>{content}</div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-10 w-10 text-fuchsia-300" />
                <p className="mt-4 font-black text-white">
                  No notifications yet
                </p>
                <p className="mt-2 text-sm text-violet-50/60">
                  Updates about approvals and replies will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}