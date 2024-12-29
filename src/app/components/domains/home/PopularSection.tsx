"use client";

import { Text } from "@/app/components/Typography";
import { usePopularAnimes } from "@/hooks/usePopularAnimes";
import { AnimeCard } from "../../AnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SkeletonRectangle } from "../../SkeletonRectangle";
import { FavCard } from "../../FavCard";
import { toast } from "sonner";

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
      <button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        <Text.Bold size="2xl">Popular</Text.Bold>
      </button>
      <ScrollArea className="w-full whitespace-nowrap">
        <ul className="flex overflow-x-auto gap-5 pb-4 h-full">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRectangle key={index} className="w-56 h-80" />
              ))
            : animes.map((anime, index) => (
                <FavCard key={anime.id} anime={anime} index={index} />
              ))}
        </ul>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
