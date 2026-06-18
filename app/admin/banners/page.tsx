import { Megaphone } from "lucide-react";
import { getAllHomepageBannersForAdmin } from "@/app/api/apiServices/bannerService";
import BannerActions from "@/app/components/admin/BannerActions";
import AddBannerDialog from "@/app/components/admin/AddBannerDialog";

export default async function AdminBannersPage() {
  const banners = await getAllHomepageBannersForAdmin();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-8 backdrop-blur-xl">
        <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Megaphone className="h-10 w-10 text-fuchsia-300" />

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Admin Banners
            </p>

            <h1 className="mt-3 text-4xl font-black">Homepage Banners</h1>

            <p className="mt-3 max-w-2xl text-violet-50/70">
              Create and manage featured homepage announcements shown to
              students on the platform.
            </p>
          </div>

          <AddBannerDialog />
        </div>
      </section>

      <section className="grid gap-5">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="overflow-hidden rounded-[2rem] border border-violet-100/10 bg-white/[0.06] backdrop-blur-xl"
          >
            <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
              <div
                className="relative min-h-56 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20"
                style={
                  banner.image_url
                    ? {
                        backgroundImage: `url(${banner.image_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                {!banner.image_url && (
                  <div className="flex h-full min-h-56 items-center justify-center">
                    <Megaphone className="h-16 w-16 text-violet-100/40" />
                  </div>
                )}

                <div className="absolute left-4 top-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      banner.is_active
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {banner.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {banner.start_date && (
                        <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
                          Starts {banner.start_date}
                        </span>
                      )}

                      {banner.end_date && (
                        <span className="rounded-full bg-violet-400/15 px-3 py-1 text-xs text-violet-100">
                          Ends {banner.end_date}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-black">{banner.title}</h2>

                    {banner.description && (
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-violet-50/70">
                        {banner.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {banner.button_text && (
                        <span className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs font-bold text-fuchsia-200">
                          Button: {banner.button_text}
                        </span>
                      )}

                      {banner.button_link && (
                        <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-violet-100/70">
                          Link: {banner.button_link}
                        </span>
                      )}
                    </div>
                  </div>

                  <BannerActions banner={banner} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {!banners.length && (
          <div className="rounded-[2rem] border border-violet-100/10 bg-white/[0.06] p-12 text-center text-violet-50/70">
            <Megaphone className="mx-auto h-14 w-14 text-fuchsia-300" />
            <h2 className="mt-5 text-2xl font-black text-white">
              No banners created yet
            </h2>
            <p className="mt-2">Create your first homepage announcement.</p>

            <div className="mt-6">
              <AddBannerDialog />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
