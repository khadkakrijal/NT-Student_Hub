"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Bell,
  Bookmark,
  ChevronDown,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "../lib/supabase/client";
import NavbarSearch from "./NavbarSearch";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: "student" | "host" | "admin";
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

export default function Navbar() {
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const [openMobileGuide, setOpenMobileGuide] = useState(false);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    {
      label: "Student Guide",
      href: "/living-in-darwin",
      children: [
        {
          label: "About Darwin",
          href: "/living-in-darwin/about-darwin",
        },
        {
          label: "Bus Routes & Transport",
          href: "/living-in-darwin/bus-routes",
        },
        {
          label: "Health Insurance (OSHC)",
          href: "/living-in-darwin/health-insurance",
        },
        {
          label: "Medical Clinics & GP",
          href: "/living-in-darwin/medical-clinics",
        },
        {
          label: "Weather & Seasons",
          href: "/living-in-darwin/weather",
        },
        {
          label: "Education & Universities",
          href: "/living-in-darwin/education",
        },
        {
          label: "Banking & TFN",
          href: "/living-in-darwin/banking-and-tfn",
        },

        {
          label: "Things To Do",
          href: "/living-in-darwin/things-to-do",
        },
        {
          label: "Nepalese Community Clubs",
          href: "/living-in-darwin/community-clubs",
        },
        {
          label: "Education & Migration Services",
          href: "/living-in-darwin/education-agencies",
        },
        {
          label: "Important Contacts",
          href: "/living-in-darwin/important-contacts",
        },
      ],
    },

    { label: "Housing", href: "/listings" },
    { label: "Jobs", href: "/jobs" },
    { label: "Community", href: "/community" },
    { label: "Events", href: "/events" },
  ];

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setNotifications([]);
        setUnreadCount(0);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email, role")
        .eq("id", user.id)
        .single();

      const currentProfile = data || {
        id: user.id,
        full_name: user.user_metadata?.full_name || null,
        email: user.email || null,
        role: "student",
      };

      setProfile(currentProfile as Profile);

      const { data: notificationData } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setNotifications(notificationData || []);
      setUnreadCount(
        notificationData?.filter((item) => !item.is_read).length || 0,
      );

      setLoading(false);
    }

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getCurrentUser();
    });

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [supabase]);

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

    window.location.href = "/";
  }

  async function handleNotificationClick(notification: Notification) {
    if (!notification.is_read) {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notification.id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id ? { ...item, is_read: true } : item,
        ),
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    setIsNotificationOpen(false);
  }

  async function handleMarkAllRead() {
    if (!profile) return;

    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", profile.id)
      .eq("is_read", false);

    setNotifications((prev) =>
      prev.map((item) => ({ ...item, is_read: true })),
    );

    setUnreadCount(0);
  }

  function handleMobileSearch(e: React.FormEvent) {
    e.preventDefault();

    const cleanQuery = mobileSearch.trim();
    if (!cleanQuery) return;

    setIsMobileMenuOpen(false);
    setMobileSearch("");
    router.push(`/search?q=${encodeURIComponent(cleanQuery)}`);
  }

  const initials =
    profile?.full_name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 w-full border-b border-violet-200/10 bg-gradient-to-b from-slate-900 to-blue-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500 shadow-lg shadow-violet-500/30"
          >
            <GraduationCap className="h-6 w-6 text-white" />
          </motion.div>

          <div>
            <h1 className="text-lg font-bold leading-none">NT Student Hub</h1>
            <p className="text-xs text-violet-200/80">Northern Territory</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                className="group relative"
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 rounded-2xl px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? "border border-fuchsia-300/30 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 text-fuchsia-100"
                      : "border border-transparent text-violet-100/75 hover:border-violet-100/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}

                  {item.children && <ChevronDown className="h-3 w-3" />}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 mt-2 w-80 rounded-3xl border border-violet-100/10 bg-gradient-to-b from-slate-900/95 to-blue-950/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-violet-100/80 transition hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </nav>

        <NavbarSearch />

        {loading ? (
          <div className="h-10 w-28 animate-pulse rounded-full bg-white/10" />
        ) : (
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            {profile && (
              <NotificationMenu
                notificationRef={notificationRef}
                isNotificationOpen={isNotificationOpen}
                setIsNotificationOpen={setIsNotificationOpen}
                notifications={notifications}
                unreadCount={unreadCount}
                handleMarkAllRead={handleMarkAllRead}
                handleNotificationClick={handleNotificationClick}
              />
            )}

            {!profile ? (
              <div className="hidden items-center gap-3 sm:flex">
                <Link
                  href="/auth/login"
                  className="rounded-full px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="cursor-pointer flex items-center gap-2 rounded-full border border-violet-100/10 bg-white/10 px-2 py-2 text-sm text-white backdrop-blur transition hover:bg-white/15"
                  title={profile.full_name || "User"}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 text-sm font-black text-[#160524]">
                    {initials}
                  </div>

                  <span className="hidden rounded-full bg-violet-400/15 px-2.5 py-1 text-[11px] font-bold capitalize text-fuchsia-200 xl:inline-flex">
                    {profile.role}
                  </span>

                  <ChevronDown className="h-4 w-4 text-violet-100/80" />
                </button>

                <UserDropdown
                  isDropdownOpen={isDropdownOpen}
                  profile={profile}
                  handleSignOut={handleSignOut}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-full border border-violet-100/10 bg-white/10 p-3 text-white transition hover:bg-white/15 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.2 }}
            className="border-t border-violet-100/10 bg-gradient-to-b from-slate-900 to-blue-950/95 px-4 pb-5 pt-4 backdrop-blur-xl lg:hidden"
          >
            <form onSubmit={handleMobileSearch} className="mb-4">
              <div className="flex items-center rounded-2xl border border-violet-100/10 bg-white/[0.06] px-4">
                <Search className="h-4 w-4 text-fuchsia-300" />

                <input
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search housing, jobs, events..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-violet-100/45"
                />
              </div>
            </form>

            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                if (item.children) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setOpenMobileGuide(!openMobileGuide)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold text-violet-50"
                      >
                        {item.label}

                        <ChevronDown
                          className={`h-4 w-4 transition ${
                            openMobileGuide ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openMobileGuide && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block rounded-xl px-4 py-2 text-sm text-violet-100/80 hover:bg-white/10"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? "border border-fuchsia-300/20 bg-violet-500/20 text-fuchsia-100"
                        : "text-violet-50/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {!profile && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl border border-violet-100/10 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl bg-violet-500 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Join Now
                  </Link>
                </div>
              )}

              {profile && (
                <div className="mt-3 rounded-3xl border border-violet-100/10 bg-white/[0.04] p-3">
                  <div className="border-b border-white/10 px-2 pb-3">
                    <p className="font-bold text-white">
                      {profile.full_name || "User"}
                    </p>
                    <p className="truncate text-sm text-violet-100/60">
                      {profile.email}
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold capitalize text-fuchsia-200">
                      {profile.role}
                    </p>
                  </div>

                  <DropdownLink
                    href="/profile"
                    icon={User}
                    label="My Profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <DropdownLink
                    href="/saved"
                    icon={Bookmark}
                    label="Saved Items"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />

                  <DropdownLink
                    href="/listings"
                    icon={Home}
                    label="Browse Housing"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />

                  {(profile.role === "host" || profile.role === "admin") && (
                    <DropdownLink
                      href="/my-listings"
                      icon={PlusCircle}
                      label="Post Accommodation"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )}

                  {profile.role === "admin" && (
                    <DropdownLink
                      href="/admin"
                      icon={ShieldCheck}
                      label="Admin Dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  )}

                  <button
                    onClick={handleSignOut}
                    className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-200 transition hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NotificationMenu({
  notificationRef,
  isNotificationOpen,
  setIsNotificationOpen,
  notifications,
  unreadCount,
  handleMarkAllRead,
  handleNotificationClick,
}: {
  notificationRef: React.RefObject<HTMLDivElement | null>;
  isNotificationOpen: boolean;
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  unreadCount: number;
  handleMarkAllRead: () => Promise<void>;
  handleNotificationClick: (notification: Notification) => Promise<void>;
}) {
  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsNotificationOpen((prev) => !prev)}
        className="relative rounded-full border border-violet-100/10 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/15"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-400 px-1 text-[10px] font-black text-[#160524]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isNotificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-3xl border border-violet-100/10 bg-[#1d0f33]/95 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-black text-white">Notifications</p>
                <p className="text-xs text-violet-100/55">
                  {unreadCount} unread
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="rounded-full bg-violet-400/15 px-3 py-2 text-xs font-bold text-fuchsia-200 transition hover:bg-violet-400/25"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[430px] overflow-y-auto">
              {notifications.length ? (
                notifications.map((notification) => {
                  const content = (
                    <div
                      className={`border-b border-white/5 p-4 transition hover:bg-white/[0.05] ${
                        !notification.is_read ? "bg-violet-400/10" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-white">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-violet-100/60">
                            {notification.message}
                          </p>

                          <p className="mt-2 text-[11px] text-violet-100/35">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>

                        {!notification.is_read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-fuchsia-300" />
                        )}
                      </div>
                    </div>
                  );

                  return notification.link ? (
                    <Link
                      key={notification.id}
                      href={notification.link}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className="block w-full text-left"
                    >
                      {content}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <Bell className="mx-auto h-10 w-10 text-fuchsia-300" />
                  <p className="mt-4 font-black text-white">
                    No notifications yet
                  </p>
                  <p className="mt-2 text-sm text-violet-100/55">
                    Approval updates will appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserDropdown({
  isDropdownOpen,
  profile,
  handleSignOut,
  setIsDropdownOpen,
}: {
  isDropdownOpen: boolean;
  profile: Profile;
  handleSignOut: () => Promise<void>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-violet-100/10 bg-gradient-to-b from-slate-900/95 to-blue-950/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <p className="font-semibold">{profile.full_name || "User"}</p>
            <p className="truncate text-sm text-violet-100/60">
              {profile.email}
            </p>
            <p className="mt-2 inline-flex rounded-full bg-violet-400/15 px-3 py-1 text-xs font-semibold capitalize text-fuchsia-200">
              {profile.role}
            </p>
          </div>

          <DropdownLink
            href="/profile"
            icon={User}
            label="My Profile"
            onClick={() => setIsDropdownOpen(false)}
          />
          <DropdownLink
            href="/saved"
            icon={Bookmark}
            label="Saved Items"
            onClick={() => setIsDropdownOpen(false)}
          />
          <DropdownLink
            href="/listings"
            icon={Home}
            label="Browse Housing"
            onClick={() => setIsDropdownOpen(false)}
          />

          {(profile.role === "host" || profile.role === "admin") && (
            <DropdownLink
              href="/my-listings"
              icon={PlusCircle}
              label="Post Accommodation"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          {profile.role === "admin" && (
            <DropdownLink
              href="/admin"
              icon={ShieldCheck}
              label="Admin Dashboard"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          <button
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-200 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DropdownLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-violet-50/85 transition hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-4 w-4 text-fuchsia-300" />
      {label}
    </Link>
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
