"use client";
import Score from "./Score";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import { Text } from "./Typography";
import { Anime } from "@/lib/types";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { formatTitle } from "../utils/formatTitle";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export function FavCard({
  anime,
  index,
  hoverBackground = true,
}: {
  anime: Anime;
  index: number;
  hoverBackground?: boolean;
}) {
  const { favs, handleFavorite } = useFavorites();

  const handleClickOnFavorite = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleFavorite(id);
  };

  return (
    <motion.li
      className="bg-neutral-800 shadow-md rounded-lg overflow-hidden h-[350px] min-w-56 relative"
      initial={{ opacity: 0, y: 50 }} // Initial state: transparent and below
      animate={{ opacity: 1, y: 0 }} // Final state: visible and at position
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: index * 0.1, // Add delay based on index
      }}
    >
      <div className="bg-neutral-800 shadow-md rounded-lg overflow-hidden h-[350px] min-w-56 relative">
        <div className="block w-full h-full">
          <div className="absolute inset-0">
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

          <div
            className={cn(
              hoverBackground &&
                "bg-black/50 hover:bg-black/0 transition-all duration-[250ms] ",
              "absolute inset-0 p-4 flex flex-col justify-between"
            )}
          >
            <div>
              <Text.Bold size="xl" className="text-lg font-bold">
                {formatTitle(
                  40,
                  anime.title.english || anime.title.native || ""
                )}
              </Text.Bold>
              {anime.averageScore && (
                <Score score={anime.averageScore} size={10} />
              )}
            </div>

            <div className="w-full flex justify-between items-center">
              <button
                className="backdrop-blur-xl bg-white/10 p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                onClick={(event) => handleClickOnFavorite(anime.id, event)}
              >
                <FaHeart
                  size={20}
                  className={classnames(
                    favs.includes(anime.id) && "text-red-500",
                    "cursor-pointer transition-colors duration-300 drop-shadow-md hover:scale-110 active:scale-95"
                  )}
                />
              </button>

              <Link href={`/details/${anime.id}`}>
                <button className="bg-yellow-400 p-2 rounded-xl  hover:bg-yellow-500 active:scale-95	 transition-all">
                  <Text.Semibold className="text-neutral-800">
                    More info
                  </Text.Semibold>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
