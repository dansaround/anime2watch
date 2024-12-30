import { data } from "@/data/main.json";
import { Text } from "./components/Typography";
import DANDADAN from "@/app/assets/dandadan.webp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function StartPage() {
  return (
    <div className="h-full mt-4 md:h-full flex items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-center py-4 sm:py-12">
        <Card className="w-full  md:mt-0 max-w-4xl mx-4 sm:mx-0 grid md:grid-cols-2 overflow-hidden">
          <div className="relative hidden md:block min-h-[300px]">
            <Image
              src={DANDADAN}
              alt="Login visual"
              className="object-cover"
              priority
              fill
            />
          </div>
          <div className="flex flex-col justify-center items-center p-4 sm:p-6">
            <CardHeader className="space-y-1 w-full">
              <CardTitle className="text-2xl text-center text-yellow-400">
                Hey there!
              </CardTitle>
              <SignedOut>
                <CardDescription className="text-center">
                  Log in with any of the following methods so we can call you by
                  your name 😄
                </CardDescription>
              </SignedOut>
            </CardHeader>
            <SignedOut>
              <CardContent className="flex flex-col gap-1 p-0">
                <SignIn
                  forceRedirectUrl="/home"
                  appearance={{
                    elements: {
                      baseTheme: "dark",
                      formButtonPrimary: {
                        fontSize: 14,
                        textTransform: "none",
                      },
                      cardBox: {
                        width: "100%",
                        maxWidth: "100%",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      },
                    },
                  }}
                />
              </CardContent>
            </SignedOut>

            <CardFooter className="flex flex-col  gap-1">
              <SignedOut>
                <div className="text-sm text-center text-muted-foreground">
                  <Text>
                    {"Don't want to log in? No worries, it's optional."}
                  </Text>
                </div>
                <Link
                  href="/home"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Continue as guest
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="text-sm text-center text-muted-foreground">
                  <Text>Seems like you already are logged in. </Text>
                </div>
                <Link
                  href="/home"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Continue to the full site
                </Link>
              </SignedIn>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}
