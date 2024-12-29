"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "@/hooks/useFavorites";
import classNames from "classnames";
import { Anime } from "@/lib/types";
import { ChartRating } from "../ChartRating";
import { GenresTooltip } from "../GenresTooltip";
import { cn } from "@/lib/utils";
import { Text } from "../Typography";

export function DetailsBanner({ anime }: { anime: Anime }) {
  const { favs, handleFavorite } = useFavorites();

  return (
    <div className="w-full  md:min-h-96 md:relative flex flex-col">
      <div className="w-full h-2/5 md:h-full md:absolute md:left-0 md:top-0 flex flex-col items-center justify-center">
        <Image
          src={anime.bannerImage || anime.coverImage.extraLarge}
          alt="Hero Image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div
        className={cn(
          "absolute h-full z-10 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-evenly  p-10 xl:px-64 "
        )}
      >
        <div className="flex flex-col h-full md:flex-row gap-2 ">
          <div className="h-full">
            <h2 className="text-4xl font-bold text-yellow-400  ">
              {anime.title.english || anime.title.native}
            </h2>
            <span className="text-wrap">
              `{anime.description.split("<")[0]}`
            </span>
            <div className="mt-3">
              <GenresTooltip anime={anime} />
            </div>
          </div>
          <div className=" flex justify-center items-center gap-3">
            <Text.Bold size="xl" className="md:hidden ">
              Add to favorites:{" "}
            </Text.Bold>
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
          <div className=" min-w-[200px] md:min-w-[300px] md:scale-75 mx-auto">
            <ChartRating
              likes={anime.averageScore || 0}
              dislikes={100 - (anime.averageScore || 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
