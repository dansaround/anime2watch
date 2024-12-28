"use client";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { formatTitle } from "../utils/formatTitle";
import { AnimeProps } from "@/app/(routes)/home/page";
import classnames from "classnames";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";

export function AnimeCard(anime: AnimeProps) {
  const { favs, handleFavorite } = useFavorites();

  const handleClickOnFavorite = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    handleFavorite(id);
  };

  return (
    <li className="bg-gray-900 shadow-md rounded-lg overflow-hidden m-4 h-96 min-w-60">
      <Link href={`/details/${anime.id}`}>
        <div className="h-60 relative">
          <Image
            objectFit="cover"
            layout="fill"
            src={anime.coverImage.large}
            alt={`Cover image for ${anime.title.english || anime.title.native}`}
          />
        </div>
        <h3 className="text-lg font-bold">
          {formatTitle(40, anime.title.english || anime.title.native)}
        </h3>
        <div className="flex justify-between">
          <span>{anime.startDate.year}</span>
          <span>`Episodes: {anime.episodes}`</span>
          <button onClick={(event) => handleClickOnFavorite(anime.id, event)}>
            <FaHeart
              className={classnames(
                favs.includes(anime.id) && "text-red-500",
                "cursor-pointer transition-colors duration-300"
              )}
            />
          </button>
        </div>
      </Link>
    </li>
  );
}
