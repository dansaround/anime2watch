"use client";
import { Anime } from "@/lib/types";

export function GenresTooltip({ anime }: { anime: Anime }) {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {anime &&
          anime.genres.map((genre, index) => (
            <span
              key={index}
              className="cursor-pointer transition-all bg-transparent/50 text-yellow-400 text-sm border border-yellow-400 p-2 rounded-md hover:bg-yellow-600 hover:text-white mx-4"
            >
              {genre}
            </span>
          ))}
      </ul>
    </>
  );
}
