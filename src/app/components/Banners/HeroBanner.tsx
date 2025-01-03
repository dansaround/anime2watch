"use client";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/lib/types";
import { Text } from "../Typography";
import classnames from "classnames";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { PrimaryButton } from "../Button/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { TriangleAlert } from "lucide-react";

export function HeroBanner({
  animes,
  isLoading,
  error,
}: {
  animes: Anime[];
  isLoading: boolean;
  error: boolean;
}) {
  const { favs, handleFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to start the interval
  const startInterval = () => {
    if (timerRef.current) clearInterval(timerRef.current); // Clear existing interval
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animes.length);
    }, 10000); // 10 seconds interval
  };

  // Start interval on mount and reset on unmount
  useEffect(() => {
    startInterval();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current); // Cleanup interval
    };
  }, [animes.length]);

  // Handle manual dot click
  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index); // Change to the clicked anime
      startInterval(); // Restart the interval
    }
  };

  const anime = animes[currentIndex];

  return isLoading || (!anime && !error) ? null : (
    <div className="relative w-full  bg-black min-h-[300px] sm:min-h-96 pt-6 overflow-hidden">
      {error ? (
        <div className="absolute w-full h-full z-10 bg-gradient-to-t from-black/100 to-transparent px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col gap-3 items-center justify-center">
          <TriangleAlert size={48} className="text-red-400" />

          <Text.Bold size="2xl" className="">
            Failed to load hero banner. Please try again later.
          </Text.Bold>
        </div>
      ) : (
        <>
          <AnimatePresence>
            <motion.div
              key={anime.id}
              initial={{ opacity: 0 }} // Fade in
              animate={{ opacity: 1 }} // Fully visible
              exit={{ opacity: 0 }} // Fade out
              transition={{ duration: 2 }} // Fade duration
              className="absolute w-full h-full"
            >
              {/* Background image with parallax effect */}
              <motion.div
                initial={{ x: "5%" }} // Start slightly to the right
                animate={{ x: "-5%" }} // End slightly to the left
                transition={{
                  duration: 15, // Match the interval duration
                  ease: "linear",
                }}
                className="absolute w-full h-full"
              >
                {anime.bannerImage ? (
                  <Image
                    className="scale-110 lg:scale-125"
                    src={anime.bannerImage || anime.coverImage.extraLarge}
                    alt="Hero Image"
                    fill
                    sizes="(max-width: 1200px) 50vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}
              </motion.div>

              {/* Overlay content */}
              <div className="absolute w-full h-full z-10 bg-gradient-to-t from-black/100 to-transparent px-4 sm:px-8 md:px-16 lg:px-24 items-end justify-evenly grid grid-cols-1 sm:grid-cols-[1fr_0.1fr] pb-16 sm:pb-24">
                <motion.div
                  initial={{ y: "100%" }} // Start below the viewport
                  animate={{ y: "0%" }} // Slide up into view
                  exit={{ y: "-100%" }} // Slide up out of view
                  transition={{ duration: 2 }} // Matches fade duration
                  className="flex flex-col gap-2 scale-100 sm:scale-90"
                >
                  {/* Anime title */}
                  <Text.Bold
                    size="5xl"
                    className="text-xl sm:text-3xl md:text-4xl font-bold text-white"
                  >
                    {anime.title.english || anime.title.native}
                  </Text.Bold>

                  {/* Anime description */}
                  <div
                    className="w-1/2 sm:w-[60%] md:w-[70%] lg:w-[80%] max-h-[60px] sm:max-h-[100px] overflow-hidden text-sm sm:text-base text-ellipsis"
                    dangerouslySetInnerHTML={{ __html: anime.description }}
                  />

                  <div className="scale-90 -ml-3  sm:-ml-0 sm:scale-100 w-1/2 sm:w-[60%] md:w-[50%] lg:w-[40%] flex items-center justify-start gap-4 sm:gap-10 mt-2">
                    <Link
                      href={`/details/${anime.id}`}
                      className="flex justify-center"
                    >
                      <PrimaryButton size="sm">See More</PrimaryButton>
                    </Link>

                    <button onClick={() => handleFavorite(anime.id)}>
                      <FaHeart
                        size={20}
                        className={classnames(
                          favs.includes(anime.id)
                            ? "text-red-500"
                            : "text-white"
                        )}
                      />
                    </button>
                  </div>
                </motion.div>

                {/* Favorite icon */}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
            {animes.map((_, index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
