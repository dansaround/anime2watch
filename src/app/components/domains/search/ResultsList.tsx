"use client";

import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { Anime } from "@/lib/types";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { Text } from "@/app/components/Typography";
import { useFavorites } from "@/hooks/useFavorites";
import { SkeletonRectangle } from "../../SkeletonRectangle";
import { placeholderImageBase64 } from "@/app/states/search-state";
import { FavCard } from "../../FavCard";
import { TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";

interface ResultsListProps {
  results: Anime[];
  isLoading: boolean;
  error?: boolean;
}

interface ResultProps {
  result: Anime;
  index: number;
}

export default function ResultsList({
  results,
  isLoading,
  error,
}: ResultsListProps) {
  const { notify } = useToast();

  useEffect(() => {
    if (error) {
      notify({
        type: "error",
        message: "Ups, something went wrong",
        description: "Anilist server is down, please try again later",
        action: {
          label: "close",
          onClick: () => console.log("useEffect from ResultsList"),
        },
      });
    }
  }, [error]);

  return (
    <div className=" pb-2">
      <ul className="flex justify-evenly lg:justify-start  items-center flex-wrap gap-6 mt-6">
        {isLoading
          ? Array.from({ length: 16 }).map((_, index) => (
              <SkeletonRectangle key={index} className="w-48 h-72 rounded-md" />
            ))
          : results.length
          ? results.map((result, index) => (
              <FavCard key={result.id} anime={result} index={index} />
            ))
          : !error && (
              <div className="w-full h-full flex items-center justify-start">
                <Text.Semibold size="lg" className="text-gray-400">
                  No results found
                </Text.Semibold>
              </div>
            )}

        {error && (
          <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <TriangleAlert size={48} className="text-red-400" />
            <Text.Semibold className="text-xl text-red-500">
              Unable to load results
            </Text.Semibold>
            <Text.Regular className="text-red-400 text-center scale-90 sm:scale-100">
              There was an error loading the search results. Please try again
              later.
            </Text.Regular>
          </div>
        )}
      </ul>
    </div>
  );
}

function ResultCard({ result, index }: ResultProps) {
  const { favs, handleFavorite } = useFavorites();

  return (
    <motion.li
      className="relative lg:w-48 lg:h-72 w-40 h-64 rounded-md shadow-md overflow-hidden "
      initial={{ opacity: 0, y: 50 }} // Initial state: transparent and below
      animate={{ opacity: 1, y: 0 }} // Final state: visible and at position
      transition={{
        duration: 0.2,
        ease: "easeOut",
        delay: index * 0.1, // Add delay based on index
      }}
    >
      <Link href={`/details/${result.id}`}>
        <div className="relative w-full h-full">
          <Image
            placeholder="blur"
            src={result.coverImage.extraLarge}
            blurDataURL={placeholderImageBase64}
            alt={result.title.english || result.title.native || "Image"}
            fill
            sizes="(max-width: 1200px) 50vw"
            style={{
              objectFit: "cover",
            }}
          />

          <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-400 absolute top-0 left-0 p-2 flex items-end justify-start hover:from-black/30 hover:to-transparent ">
            <Text.Bold size="lg">
              {result.title.english || result.title.native}
            </Text.Bold>
          </div>
        </div>
      </Link>
      <button
        className="absolute top-1 right-1 p-2"
        onClick={(event) => handleFavorite(result.id)}
      >
        <FaHeart
          size={30}
          className={cn(
            favs.includes(result.id) && "text-red-500",
            "cursor-pointer transition-colors duration-300"
          )}
        />
      </button>
    </motion.li>
  );
}
