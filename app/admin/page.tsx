import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Home,
  MessageCircle,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import {
  getAdminAnalytics,
  getAdminLatestItems,
} from "@/app/api/apiServices/adminAnalyticsService";

export default async function AdminDashboardPage() {
  const analytics = await getAdminAnalytics();
  const latest = await getAdminLatestItems();

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
        <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
            Admin
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Admin Analytics
          </h1>

          <p className="mt-3 max-w-2xl text-violet-50/70">
            Monitor users, approvals, featured content, jobs, events, housing
            and community activity.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          icon={Clock}
          title="Pending Reviews"
          value={analytics.pendingTotal}
          href="/admin"
        />
        <AdminStatCard
          icon={Users}
          title="Total Users"
          value={analytics.users.total}
          href="/admin/users"
        />
        <AdminStatCard
          icon={Home}
          title="Listings"
          value={analytics.listings.total}
          href="/admin/listings"
        />
        <AdminStatCard
          icon={Briefcase}
          title="Jobs"
          value={analytics.jobs.total}
          href="/admin/jobs"
        />
        <AdminStatCard
          icon={CalendarDays}
          title="Events"
          value={analytics.events.total}
          href="/admin/events"
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MiniReviewCard
          title="Pending Listings"
          value={analytics.listings.pending}
          href="/admin/listings"
        />
        <MiniReviewCard
          title="Pending Events"
          value={analytics.events.pending}
          href="/admin/events"
        />
        <MiniReviewCard
          title="Pending Posts"
          value={analytics.community.pendingPosts}
          href="/admin/community"
        />
        <MiniReviewCard
          title="Pending Replies"
          value={analytics.community.pendingReplies}
          href="/admin/community"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AnalyticsPanel
          title="Users"
          icon={Users}
          rows={[
            ["Total Users", analytics.users.total],
            ["Students", analytics.users.students],
            ["Hosts", analytics.users.hosts],
            ["Admins", analytics.users.admins],
          ]}
        />

        <AnalyticsPanel
          title="Accommodation"
          icon={Home}
          rows={[
            ["Total", analytics.listings.total],
            ["Approved", analytics.listings.approved],
            ["Pending", analytics.listings.pending],
            ["Rejected", analytics.listings.rejected],
            ["Featured", analytics.listings.featured],
          ]}
        />

        <AnalyticsPanel
          title="Jobs"
          icon={Briefcase}
          rows={[
            ["Total", analytics.jobs.total],
            ["Active", analytics.jobs.active],
            ["Closed", analytics.jobs.closed],
            ["Draft", analytics.jobs.draft],
            ["Featured", analytics.jobs.featured],
          ]}
        />

        <AnalyticsPanel
          title="Events"
          icon={CalendarDays}
          rows={[
            ["Total", analytics.events.total],
            ["Approved", analytics.events.approved],
            ["Pending", analytics.events.pending],
            ["Rejected", analytics.events.rejected],
            ["Featured", analytics.events.featured],
          ]}
        />

        <AnalyticsPanel
          title="Community"
          icon={MessageCircle}
          rows={[
            ["Posts", analytics.community.posts],
            ["Replies", analytics.community.replies],
            ["Pending Posts", analytics.community.pendingPosts],
            ["Pending Replies", analytics.community.pendingReplies],
            ["Featured Posts", analytics.community.featuredPosts],
          ]}
        />

        <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black">Quick Admin Actions</h2>

          <div className="mt-5 space-y-3">
            <QuickLink href="/admin/listings" label="Review accommodation" />
            <QuickLink href="/admin/events" label="Review events" />
            <QuickLink href="/admin/community" label="Review community" />
            <QuickLink href="/admin/jobs" label="Manage jobs" />
            <QuickLink href="/admin/users" label="Manage users" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-4">
        <LatestPanel
          title="Latest Listings"
          href="/admin/listings"
          emptyText="No listings yet."
          items={latest.listings.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: `${item.suburb || "No suburb"} · $${item.rent_per_week}/week`,
            status: item.status || "pending",
            featured: item.featured || false,
          }))}
        />

        <LatestPanel
          title="Latest Jobs"
          href="/admin/jobs"
          emptyText="No jobs yet."
          items={latest.jobs.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: `${item.company_name || "Company"} · ${item.suburb || "Darwin"}`,
            status: item.status || "active",
            featured: item.featured || false,
          }))}
        />

        <LatestPanel
          title="Latest Events"
          href="/admin/events"
          emptyText="No events yet."
          items={latest.events.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.suburb || "No suburb",
            status: item.status || "pending",
            featured: item.featured || false,
          }))}
        />

        <LatestPanel
          title="Latest Community"
          href="/admin/community"
          emptyText="No posts yet."
          items={latest.posts.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.category || "Community",
            status: item.status || "pending",
            featured: item.featured || false,
          }))}
        />
      </section>
    </div>
  );
}

function AdminStatCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-300/40 hover:bg-white/[0.09]"
    >
      <Icon className="h-6 w-6 text-fuchsia-300" />
      <p className="mt-4 text-sm text-violet-50/60">{title}</p>
      <h2 className="mt-2 text-4xl font-black">{value}</h2>
    </Link>
  );
}

function MiniReviewCard({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.5rem] border border-violet-100/10 bg-white/[0.05] p-5 transition hover:border-fuchsia-300/40 hover:bg-white/[0.08]"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-violet-50/60">{title}</p>
          <h3 className="mt-2 text-3xl font-black">{value}</h3>
        </div>

        {value > 0 ? (
          <Clock className="h-6 w-6 text-yellow-300" />
        ) : (
          <CheckCircle2 className="h-6 w-6 text-emerald-300" />
        )}
      </div>
    </Link>
  );
}

function AnalyticsPanel({
  title,
  icon: Icon,
  rows,
}: {
  title: string;
  icon: React.ElementType;
  rows: [string, number][];
}) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-fuchsia-300" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>

      <div className="mt-6 grid gap-3">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3"
          >
            <p className="text-sm text-violet-50/70">{label}</p>
            <p className="text-xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestPanel({
  title,
  href,
  items,
  emptyText,
}: {
  title: string;
  href: string;
  emptyText: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    featured: boolean;
  }[];
}) {
  return (
    <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black">{title}</h2>

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-bold text-fuchsia-300"
        >
          Manage <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white/[0.05] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-violet-50/60">{item.subtitle}</p>
              </div>

              {item.featured && (
                <Star className="h-4 w-4 shrink-0 fill-yellow-300 text-yellow-300" />
              )}
            </div>

            <div className="mt-3">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}

        {!items.length && <p className="text-violet-50/60">{emptyText}</p>}
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl bg-white/[0.05] p-4 font-semibold text-violet-50/80 transition hover:bg-white/[0.08] hover:text-white"
    >
      {label}
      <ArrowRight className="h-4 w-4 text-fuchsia-300" />
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "approved" || status === "active"
      ? "bg-emerald-400/15 text-emerald-200"
      : status === "rejected" || status === "closed"
        ? "bg-red-400/15 text-red-200"
        : "bg-yellow-400/15 text-yellow-200";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${style}`}
    >
      {status}
    </span>
  );
}
