import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { AnimeProps } from "../home/page";

export function Banner({ anime }: { anime: AnimeProps }) {
  return (
    <div className="w-full  bg-red-400 min-h-96 relative">
      <Image
        objectFit="cover"
        layout="fill"
        src={anime.bannerImage || anime.coverImage.large}
        alt="Hero Image"
      />
      <div className="absolute bottom-0  bg-black bg-opacity-50 px-24 items-center justify-evenly h-32 grid grid-cols-[1fr_0.1fr] ">
        <div>
          <h2 className="text-4xl font-bold text-white  ">
            {anime.title.english || anime.title.native}
          </h2>
          <span className="text-wrap">`{anime.description}`</span>
        </div>
        <div className=" flex justify-center">
          <FaHeart size={40} />
        </div>
      </div>
    </div>
  );
}
