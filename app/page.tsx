import GuideWelcomeDialog from "./components/GuideWelcomeDialog";
import HeroSection from "./components/HeroSection";
import HomeQuickActions from "./components/home/HomeQuickActions";
import HomeGuideSections from "./components/home/HomeGuideSections";
import HomeSafetySection from "./components/home/HomeSafetySection";

import { getCurrentProfile } from "@/app/api/apiServices/profileService";
import HomeWelcomeBack from "./components/home/HomeWelcomeBack";
import { getHomeDashboardStats } from "./api/apiServices/homeDashboardService";
import HomePlatformStats from "./components/home/HomePlatformStats";
import { getFeaturedContent } from "./api/apiServices/featuredService";
import HomeFeaturedSection from "./components/home/HomeFeaturedSection";
import HomeRecentlyAdded from "./components/home/HomeRecentlyAdded";
import { getRecentlyAddedContent } from "./api/apiServices/recentlyAddedService";
import { getPersonalizedRecommendations } from "./api/apiServices/recommendationService";
import HomeRecommendations from "./components/home/HomeRecommendations";
import { getActiveHomepageBanners } from "./api/apiServices/bannerService";
import HomeFeaturedBanner from "./components/home/HomeFeaturedBanner";

export default async function Home() {
  const profile = await getCurrentProfile();
  const banners = await getActiveHomepageBanners();
  const stats = await getHomeDashboardStats();
  const featured = await getFeaturedContent();
  const recentlyAdded = await getRecentlyAddedContent();
  const recommendations = await getPersonalizedRecommendations();

  return (
    <main className="bg-[#12091f]">
      <GuideWelcomeDialog />
      <HeroSection />
      <HomeFeaturedBanner banners={banners} />
      {profile && (
        <HomeWelcomeBack
          fullName={profile.full_name}
          role={profile.role}
          stats={{
            saved: stats.saved,
            unreadNotifications: stats.unreadNotifications,
            jobs: stats.jobs,
            events: stats.events,
          }}
        />
      )}
      <HomePlatformStats
        stats={{
          listings: stats.listings,
          jobs: stats.jobs,
          events: stats.events,
          posts: stats.posts,
        }}
      />
      <HomeFeaturedSection featured={featured} />
      {profile && <HomeRecommendations recommendations={recommendations} />}
      <HomeQuickActions role={profile?.role || null} />
      <HomeGuideSections />
      <HomeRecentlyAdded recentlyAdded={recentlyAdded} />
      <HomeSafetySection />
    </main>
  );
}
