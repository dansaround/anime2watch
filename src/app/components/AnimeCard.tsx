"use client";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { formatTitle } from "../utils/formatTitle";
import { AnimeProps } from "../home/page";
import useLocalStorage from "@/hooks/useLocalStorage";
import classnames from "classnames";

export function AnimeCard(anime: AnimeProps) {
  const [storedValue, setStoredValue] = useLocalStorage<{
    favorites: number[];
  }>("favorites", {
    favorites: [],
  });

  const handleSaveFavorite = () => {
    if (storedValue.favorites.includes(anime.id)) {
      setStoredValue((prev) => ({
        favorites: prev.favorites.filter((favId) => favId !== anime.id),
      }));
    } else {
      setStoredValue((prev) => ({ favorites: [...prev.favorites, anime.id] }));
    }
  };

  return (
    <li className="bg-gray-900 shadow-md rounded-lg overflow-hidden m-4 h-96 min-w-60">
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

        <button onClick={() => handleSaveFavorite()}>
          <FaHeart
            className={classnames(
              "cursor-pointer",
              storedValue?.favorites.includes(anime.id) && "text-red-500"
            )}
          />
        </button>
      </div>
    </li>
  );
}
