"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";
import { Text } from "./Typography";
import { PrimaryButton } from "./Button/PrimaryButton";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/SearchInput";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={classNames(
        `fixed top-0 left-0 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black "
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`,
        "flex justify-between h-16 items-center px-20 z-20"
      )}
    >
      <div className="flex items-center gap-12 ">
        <Link href="/home">
          <Text size="xl" weight="bold" className={classNames(` text-white`)}>
            Anime2Watch
          </Text>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Text size="lg">Popular</Text>
            </li>
            <Link href="/favorites">
              <Text size="lg">Favorites</Text>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex justify-end gap-4 w-64 ">
          {isSearching ? (
            <motion.div
              initial={{
                x: "100%",
                scaleX: 0.3,
                opacity: 0,
              }}
              animate={{
                x: "0%",
                scaleX: 1,
                opacity: 1,
              }}
              exit={{
                x: "-100%",
                scaleX: 0.3,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.3, 1],
                opacity: {
                  delay: 0.2, // Start fading in at 30% of the animation
                  duration: 0.35,
                },
                scaleX: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              }}
              className="flex items-center gap-4 origin-center"
            >
              <SearchInput
                placeholder="title here..."
                onBlur={() => setIsSearching(false)}
                autoFocus
              />
            </motion.div>
          ) : (
            <FaSearch size={20} onClick={() => setIsSearching(!isSearching)} />
          )}
        </div>
        <div className="flex items-center w-48">
          <PrimaryButton>Sign In</PrimaryButton>
        </div>
      </div>
    </header>
  );
}
