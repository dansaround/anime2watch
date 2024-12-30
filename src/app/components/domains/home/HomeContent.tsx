"use client";

import { Anime } from "@/lib/types";
import UpcomingSection from "./UpcomingSection";
import RecentsSection from "./RecentsSection";
import PopularSection from "./PopularSection";
import FilteredAnimesList from "./FilteredAnimesList";
import { useFilteredAnimes } from "@/hooks/useFiltersAnimes";

interface HomeContentProps {
  popularAnimes: {
    animes: Anime[];
    loading: boolean;
    error: boolean;
  };
  upcomingAnimes: {
    animes: Anime[];
    loading: boolean;
    error: boolean;
  };
  recentAnimes: {
    animes: Anime[];
    loading: boolean;
    error: boolean;
  };
}

export default function HomeContent({
  popularAnimes,
  upcomingAnimes,
  recentAnimes,
}: HomeContentProps) {
  const { hasFiltersApplied, error } = useFilteredAnimes({
    perPage: 10,
  });

  return (
    <div className="max-w-full min-h-full overflow-x-hidden flex flex-col">
      {!hasFiltersApplied && (
        <div className="flex flex-col space-y-4 gap-8 justify-start p-6 ">
          <PopularSection
            animes={popularAnimes.animes}
            error={popularAnimes.error}
            loading={popularAnimes.loading}
          />
          <UpcomingSection
            animes={upcomingAnimes.animes}
            error={upcomingAnimes.error}
            loading={upcomingAnimes.loading}
          />
          <RecentsSection
            animes={recentAnimes.animes}
            error={recentAnimes.error}
            loading={recentAnimes.loading}
          />
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
