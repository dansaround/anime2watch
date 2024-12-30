"use client";

import { Text } from "@/app/components/Typography";
import { useUpcomingAnimes } from "@/hooks/useUpcomingAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FavCard } from "../../FavCard";
import { SkeletonRectangle } from "../../SkeletonRectangle";

export default function UpcomingSection() {
  const {
    loading,
    error,
    animes,
    totalResults,
    currentPage,
    lastPage,
    hasNextPage,
    pagesToRender,
    setPage,
  } = useUpcomingAnimes({ perPage: 10 });

  return (
    <div className="flex flex-col gap-4">
      <Text.Bold size="2xl" className="text-yellow-500">
        Upcoming
      </Text.Bold>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex overflow-x-auto gap-5 pb-4">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonRectangle key={index} className="w-56 h-80" />
            ))
          ) : error ? (
            <div className="w-56 h-80 flex items-center justify-center bg-gray-800 rounded-lg">
              <Text.Regular className="text-red-500 text-center px-4">
                Error loading upcoming anime
              </Text.Regular>
            </div>
          ) : (
            animes.map((anime, index) => (
              <FavCard key={anime.id} anime={anime} index={index} />
            ))
          )}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
