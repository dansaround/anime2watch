"use client";

import { Text } from "@/app/components/Typography";
import { useRecentAnimes } from "@/hooks/useRecentAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function RecentsSection() {
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
  } = useRecentAnimes({ perPage: 10 });

  return (
    <div className="flex flex-col gap-4">
      <Text.Bold size="2xl">Recents (2024)</Text.Bold>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex overflow-x-auto gap-5 pb-2">
          {loading
            ? "Loading ..."
            : animes.map((anime) => <AnimeCard key={anime.id} {...anime} />)}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
