import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { AnimeProps } from "@/app/(routes)/home/page";

export function DetailsBanner({ anime }: { anime: AnimeProps }) {
  return (
    <div className="w-full bg-red-400 min-h-96 relative">
      <div className="w-full h-full absolute left-0 top-0">
        <Image
          objectFit="cover"
          layout="fill"
          src={anime.bannerImage || anime.coverImage.large}
          alt="Hero Image"
        />
      </div>
      <div className="absolute w-full h-full z-10 bg-gradient-to-t from-black/100 to-transparent px-24 items-center justify-evenly grid grid-cols-[1fr_0.1fr] ">
        <div>
          <h2 className="text-4xl font-bold text-white  ">
            {anime.title.english || anime.title.native}
          </h2>
          <span className="text-wrap">`{anime.description.split("<")[0]}`</span>
        </div>
        <div className=" flex justify-center">
          <FaHeart size={40} />
        </div>
      </div>
    </div>
  );
}
