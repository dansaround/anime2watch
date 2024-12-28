"use client";

import { Text } from "@/app/components/Typography";
import { usePopularAnimes } from "@/hooks/usePopularAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SkeletonRectangle } from "../../SkeletonRectangle";

export default function PopularSection() {
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
  } = usePopularAnimes({ perPage: 10 });

  return (
    <div className="flex flex-col gap-4">
      <Text.Bold size="2xl">Popular</Text.Bold>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex overflow-x-auto gap-5 pb-4 h-full">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRectangle key={index} className="w-56 h-80" />
              ))
            : animes.map((anime) => <AnimeCard key={anime.id} {...anime} />)}
        </ul>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
