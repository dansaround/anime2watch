import type { Metadata } from "next";
import { data } from "@/data/main.json";
import { AnimeProps } from "../home/page";
import { Geist, Geist_Mono } from "next/font/google";
import { Banner } from "../components/Banner";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mockData: AnimeProps[] = data.Page.media;

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col bg-gray-100 relative`}
    >
      <header className="flex bg-black justify-between items-center p-4 border-b-4 border-blue-400">
        Logo Here
        <nav>
          <ul className="flex space-x-4">
            <li>Popular</li>
            <li>Favorites</li>
            <li>Genres</li>
          </ul>
        </nav>
        <div>
          <button>Sign In</button>
        </div>
      </header>

      <Banner anime={mockData[0]} />

      <div className="flex-grow">
        <div className="grid grid-cols-[1fr_6fr] h-full bg-blue-300">
          <Sidebar />
          <main className="bg-black w-full overflow-x-hidden border ">
            {children}
          </main>
        </div>
      </div>
      <footer className="h-12 p-4 w-full bg-black flex justify-center border-t-4 border-blue-500">
        Made with ❤️ by Daniel Kcomt :D
      </footer>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="bg-orange-900 w-full h-full flex flex-col pt-10 px-3">
      <span className="text-xl font-semibold pt-6 pb-2">Busqueda</span>
      <input placeholder="Búsqueda" />
      <span className="text-xl font-semibold pt-6 pb-2">Puntuación</span>
      <Stars quantity={5} />
      <Stars quantity={4} />
      <Stars quantity={3} /> test
      <Stars quantity={2} />
      <Stars quantity={1} />
      <span className="text-xl font-semibold pt-6 pb-2">Género</span>
      <span className="text-xl font-semibold pt-6 pb-2">Status</span>
    </aside>
  );
}

function Stars({ quantity }: { quantity: number }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex space-x-1">
      {Array(quantity)
        .fill(0)
        .map((_, index) => {
          return <FaStar key={index} />;
        })}
    </div>
  );
}
