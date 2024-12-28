"use client";

import { data } from "@/data/main.json";
import PopularSection from "@/app/components/domains/home/PopularSection";
import RecentsSection from "@/app/components/domains/home/RecentsSection";
import UpcomingSection from "@/app/components/domains/home/UpcomingSection";

export type AnimeProps = (typeof data.Page.media)[0];

export default function HomePage() {
  const mockData = data.Page.media;

  return (
    <div className="flex flex-col space-y-4 gap-8 justify-start p-6 max-w-full overflow-x-hidden">
      <PopularSection />
      <UpcomingSection />
      <RecentsSection />
    </div>
  );
}
