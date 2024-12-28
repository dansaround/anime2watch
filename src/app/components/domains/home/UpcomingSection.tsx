"use client";

import { Text } from "@/app/components/Typography";
import { useUpcomingAnimes } from "@/hooks/useUpcomingAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <Text.Bold size="2xl">Upcoming</Text.Bold>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex overflow-x-auto gap-5 pb-4">
          {loading
            ? "Loading ..."
            : animes.map((anime) => <AnimeCard key={anime.id} {...anime} />)}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
