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
import { motion } from "framer-motion";
import { useState } from "react";

export function DetailsBanner({ anime }: { anime: Anime }) {
  const { favs, handleFavorite } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);

  const description = anime.description.split("<")[0];

  return (
    <div className="relative w-full min-h-[400px] md:min-h-96">
      <div className="absolute inset-0">
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative h-full w-full z-10 bg-gradient-to-b from-black/90 to-from-black/20",
          "p-6 md:p-10 xl:px-64"
        )}
      >
        <div className="flex flex-col h-full md:flex-row gap-4 md:gap-2 md:items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-full"
          >
            <h2 className="text-4xl font-bold text-yellow-400">
              {anime.title.english || anime.title.native}
            </h2>
            <div className="relative">
              <p
                className={cn(
                  "text-wrap transition-all duration-300",
                  !isExpanded && "line-clamp-2"
                )}
              >
                {description}
              </p>
              {description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-yellow-400 hover:text-yellow-200 mt-1 underline text-sm font-semibold"
                >
                  {isExpanded ? "Show Less" : "Continue Reading"}
                </button>
              )}
            </div>
            <div className="mt-3">
              <GenresTooltip anime={anime} />
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex justify-center items-center gap-3"
          >
            <Text.Bold size="xl" className="md:hidden ">
              Add to favorites:{" "}
            </Text.Bold>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart
                size={40}
                onClick={() => {
                  handleFavorite(anime.id);
                }}
                className={classNames(
                  favs.includes(anime.id) ? "text-red-500" : "text-white"
                )}
              />
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className=""
          >
            <div className="min-w-[200px] md:min-w-[300px] md:scale-90 scale-75 mx-auto">
              <ChartRating
                likes={anime.averageScore || 0}
                dislikes={100 - (anime.averageScore || 0)}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
