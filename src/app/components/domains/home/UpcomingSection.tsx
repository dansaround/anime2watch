"use client";

import { Text } from "@/app/components/Typography";
import { useUpcomingAnimes } from "@/hooks/useUpcomingAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FavCard } from "../../FavCard";

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
            : animes.map((anime, index) => (
                <FavCard key={anime.id} anime={anime} index={index} />
              ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
