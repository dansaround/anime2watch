"use client";
import Link from "next/link";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Text } from "./Typography";
import classNames from "classnames";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { searchAtom } from "../states/search-state";
import { PrimaryButton } from "./Button/PrimaryButton";
import { usePathname, useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/SearchInput";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useAtom(searchAtom);
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    if (query) {
      setSearch(query);
      setIsSearching(true);
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearch(inputValue);

    // Update the search parameter in the URL dynamically in real-time
    const params = new URLSearchParams(window.location.search);
    if (inputValue.length) {
      params.set("q", encodeURIComponent(inputValue));
      router.replace(`/search?${params.toString()}`);
    } else {
      setTimeout(() => router.replace("/home"), 300);
    }
  };

  return (
    <header
      className={cn(
        `fixed top-0 left-0 w-full transition-all duration-300 ${
          !isScrolled
            ? "bg-gradient-to-b from-black/60 to-transparent"
            : "bg-black"
        }`,
        "flex justify-between h-16 items-center px-20 z-20"
      )}
    >
      <div className="flex items-center gap-12 ">
        <Link href="/home">
          <Text.Bold size="xl" className={classNames(` text-white`)}>
            Anime2Watch {isScrolled ? "🔥" : ""}
          </Text.Bold>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {pathname !== "/" && (
              <Link href="/favorites">
                <Text size="lg">Favorites</Text>
              </Link>
            )}
          </ul>
        </nav>
      </div>
      <div className="flex justify-end items-center gap-4 ">
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
                autoFocus
                placeholder="title here..."
                value={search}
                onChange={handleSearchChange}
                onBlur={() => !search && setIsSearching(false)}
              />
            </motion.div>
          ) : (
            <button onClick={() => setIsSearching(!isSearching)}>
              <FaSearch size={20} />
            </button>
          )}
        </div>
        <div className="flex items-center ">
          <SignedOut>
            <div className="flex items-center justify-center">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
