"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  LayoutDashboard,
  Home,
  Users,
  ShieldCheck,
  Briefcase,
  MessageSquare,
  PartyPopper,
  Globe,
  LogOut,
  Megaphone,
  Flag,
} from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";

export default function AdminSidebarClient({
  counts,
}: {
  counts: {
    listings: number;
    events: number;
    community: number;
    jobs: number;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      count: 0,
    },
    {
      label: "Listings",
      href: "/admin/listings",
      icon: Home,
      count: counts.listings,
    },
    {
      label: "Jobs",
      href: "/admin/jobs",
      icon: Briefcase,
      count: counts.jobs,
    },
    {
      label: "Community",
      href: "/admin/community",
      icon: MessageSquare,
      count: counts.community,
    },
    {
      label: "Events",
      href: "/admin/events",
      icon: PartyPopper,
      count: counts.events,
    },
    {
      label: "Banners",
      href: "/admin/banners",
      icon: Megaphone,
      count: 0,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
      count: 0,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: Flag,
      count: 0,
    },
  ];

  async function handleSignOut() {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "You will be logged out of NT Student Hub.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      background: "#1d0f33",
      color: "#fff",
      confirmButtonColor: "#a78bfa",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    await supabase.auth.signOut();

    await Swal.fire({
      icon: "success",
      title: "Signed out",
      timer: 1000,
      showConfirmButton: false,
      background: "#1d0f33",
      color: "#fff",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-violet-100/10 bg-gradient-to-b from-slate-900 to-blue-950/95 px-5 py-6 backdrop-blur-xl lg:block">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>

        <div>
          <h2 className="font-bold text-white">Admin Panel</h2>
          <p className="text-xs text-violet-200/70">NT Student Hub</p>
        </div>
      </Link>

      <nav className="max-h-[calc(100vh-260px)] space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-violet-500/40 scrollbar-track-transparent">
        {links.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border border-fuchsia-300/20 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/20 text-white shadow-lg"
                  : "text-violet-50/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon
                className={`h-5 w-5 transition ${
                  isActive
                    ? "text-fuchsia-300"
                    : "text-violet-300 group-hover:text-fuchsia-300"
                }`}
              />

              <span>{item.label}</span>

              <div className="ml-auto flex items-center gap-2">
                {item.count > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-fuchsia-400 px-2 text-xs font-black text-[#160524]">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}

                {isActive && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-300" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl border border-violet-100/10 bg-white/[0.04] px-4 py-3 text-sm text-violet-50/80 transition hover:bg-white/10 hover:text-white"
        >
          <Globe className="h-4 w-4 text-fuchsia-300" />
          View Platform
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-2xl border border-red-300/10 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20 hover:text-red-100"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
