"use client";

import Image from "next/legacy/image";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "@/hooks/useFavorites";
import classNames from "classnames";
import { Anime } from "@/lib/types";
import { ChartRating } from "../ChartRating";
import { GenresTooltip } from "../GenresTooltip";

export function DetailsBanner({ anime }: { anime: Anime }) {
  const { favs, handleFavorite } = useFavorites();

  return (
    <div className="w-full bg-red-400 min-h-96 relative">
      <div className="w-full h-full absolute left-0 top-0">
        <Image
          objectFit="cover"
          layout="fill"
          src={anime.bannerImage || anime.coverImage.extraLarge}
          alt="Hero Image"
        />
      </div>
      <div className="absolute w-full h-full z-10 bg-gradient-to-t from-black/70 to-transparent  items-center justify-evenly grid grid-cols-[1fr_0.3fr] px-64 ">
        <div className="flex gap-2">
          <div>
            <h2 className="text-4xl font-bold text-white  ">
              {anime.title.english || anime.title.native}
            </h2>
            <span className="text-wrap">
              `{anime.description.split("<")[0]}`
            </span>
            <div className="mt-3">
              <GenresTooltip anime={anime} />
            </div>
          </div>
          <div className="pr-44 flex justify-center items-center ">
            <button>
              <FaHeart
                size={40}
                onClick={() => {
                  handleFavorite(anime.id);
                }}
                className={classNames(
                  favs.includes(anime.id) ? "text-red-500" : "text-white"
                )}
              />
            </button>
          </div>
        </div>
        <div className=" flex justify-center">
          <ChartRating
            likes={anime.averageScore || 0}
            dislikes={100 - (anime.averageScore || 0)}
          />
        </div>
      </div>
    </div>
  );
}
