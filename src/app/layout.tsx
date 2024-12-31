import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloProvider from "@/app/utils/ApolloProvider";
import { ThemeProvider } from "next-themes";
import Header from "./components/Header";
import { dark } from "@clerk/themes";

import { Text } from "./components/Typography";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime2Watch | Login",
  description: "The information you need of your favorite anime",
  openGraph: {
    title: "Anime2Watch | Login",
    description: "The information you need of your favorite anime",
    images: [
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
    ],
    url: "https://anime2watch.vercel.app/login",
    type: "website",
  },
};

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <ApolloProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen grid grid-rows-[4rem_1fr_3rem] relative w-scr max-w-full`}
            >
              <div className="w-full h-16">
                <Header />
              </div>

              <main className="w-full h-full overflow-x-hidden">
                {children}
              </main>

              <footer className="h-full p-4 w-full flex justify-center bg-yellow-400">
                <Text.Bold size="base" className="text-black">
                  Made with ❤️ by Daniel Kcomt :D
                </Text.Bold>
              </footer>
            </body>
          </ThemeProvider>
        </ApolloProvider>
      </html>
    </ClerkProvider>
  );
}
