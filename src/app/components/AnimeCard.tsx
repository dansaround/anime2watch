"use client";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import { Text } from "./Typography";
import { Anime } from "@/lib/types";
import { FaHeart } from "react-icons/fa";
import { formatTitle } from "../utils/formatTitle";
import { useFavorites } from "@/hooks/useFavorites";
import Score from "./Score";

export function AnimeCard(anime: Anime) {
  const { favs, handleFavorite } = useFavorites();

  const handleClickOnFavorite = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleFavorite(id);
  };

  return (
    <li className="bg-neutral-800 shadow-md rounded-lg overflow-hidden h-[350px] min-w-56 relative ">
      <Link
        href={`/details/${anime.id}`}
        className="grid grid-rows-[208px_1fr] h-full"
      >
        <div className="h-52 relative">
          {anime.coverImage ? (
            <Image
              src={anime.coverImage.extraLarge}
              alt={`Cover image for ${
                anime.title.english || anime.title.native
              }`}
              fill
              sizes="(max-width: 1200px) 50vw"
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>

        <section className="h-full px-2 py-3 flex flex-col justify-between items-start gap-2">
          <Text.Bold size="lg" className="text-lg font-bold">
            {formatTitle(40, anime.title.english || anime.title.native || "")}
          </Text.Bold>

          <div className="w-full flex justify-between items-center">
            <div className="w-full flex flex-col justify-end items-start">
              {anime.startDate ? (
                <Text size="sm">{anime.startDate.year}</Text>
              ) : null}
              {anime.episodes ? (
                <Text size="sm">{anime.episodes} episodes</Text>
              ) : null}
            </div>

            <div className="self-end mb-1">
              {anime.averageScore && (
                <Score score={anime.averageScore} size={10} />
              )}
            </div>
          </div>
        </section>
      </Link>
      <button
        className="absolute top-2 right-2"
        onClick={(event) => handleClickOnFavorite(anime.id, event)}
      >
        <FaHeart
          size={24}
          className={classnames(
            favs.includes(anime.id) && "text-red-500",
            "cursor-pointer transition-colors duration-300 drop-shadow-md active:scale-90"
          )}
        />
      </button>
    </li>
  );
}
