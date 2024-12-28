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

interface ResultsListProps {
  results: Anime[];
  isLoading: boolean;
}

interface ResultProps {
  result: Anime;
  index: number;
}

export default function ResultsList({ results, isLoading }: ResultsListProps) {
  return (
    <div className="w- pb-2">
      <ul className="flex items-center flex-wrap gap-6 mt-6">
        {isLoading ? (
          Array.from({ length: 16 }).map((_, index) => (
            <SkeletonRectangle key={index} className="w-48 h-72 rounded-md" />
          ))
        ) : results.length ? (
          results.map((result, index) => (
            <Result key={result.id} result={result} index={index} />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-start">
            <Text.Semibold size="lg" className="text-gray-400">
              No results found
            </Text.Semibold>
          </div>
        )}
      </ul>
    </div>
  );
}

function Result({ result, index }: ResultProps) {
  const { favs, handleFavorite } = useFavorites();

  return (
    <motion.li
      className="relative w-48 h-72 rounded-md shadow-md overflow-hidden"
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
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            src={result.coverImage.extraLarge}
            blurDataURL={placeholderImageBase64}
            alt={result.title.english || result.title.native || "Image"}
          />

          <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent absolute top-0 left-0 p-2 flex items-end justify-start">
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
          size={18}
          className={cn(
            favs.includes(result.id) && "text-red-500",
            "cursor-pointer transition-colors duration-300"
          )}
        />
      </button>
    </motion.li>
  );
}
