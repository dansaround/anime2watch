"use client";

import { data } from "@/data/main.json";
import { useFilteredAnimes } from "@/hooks/useFiltersAnimes";
import PopularSection from "@/app/components/domains/home/PopularSection";
import RecentsSection from "@/app/components/domains/home/RecentsSection";
import UpcomingSection from "@/app/components/domains/home/UpcomingSection";
import FilteredAnimesList from "@/app/components/domains/home/FilteredAnimesList";

export type AnimeProps = (typeof data.Page.media)[0];

export default function HomePage() {
  const { hasFiltersApplied } = useFilteredAnimes({ perPage: 10 });

  return (
    <div className="max-w-full overflow-x-hidden flex flex-col">
      {!hasFiltersApplied && (
        <div className="flex flex-col space-y-4 gap-8 justify-start p-6 ">
          <PopularSection />
          <UpcomingSection />
          <RecentsSection />
        </div>
      )}

      {hasFiltersApplied && (
        <div className="p-6">
          <FilteredAnimesList />
        </div>
      )}
    </div>
  );
}
