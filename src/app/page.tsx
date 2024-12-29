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
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function StartPage() {
  return (
    <div className="h-full flex  items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="h-full  flex  items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl h-4/5  grid md:grid-cols-2 overflow-hidden">
          <div className="relative hidden md:block">
            <Image
              src={DANDADAN}
              alt="Login visual"
              className="object-cover"
              priority
              fill
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <CardHeader className="space-y-1">
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
              <CardContent className="flex flex-col gap-1">
                <SignIn
                  forceRedirectUrl="/home"
                  appearance={{
                    elements: {
                      formButtonPrimary: {
                        fontSize: 14,
                        textTransform: "none",
                        backgroundColor: "#35007b",
                        "&:hover, &:focus, &:active": {
                          backgroundColor: "#996ad7",
                        },
                      },
                    },
                  }}
                />{" "}
              </CardContent>
            </SignedOut>

            <CardFooter className="flex flex-col  gap-1">
              <SignedOut>
                <div className="text-sm text-center text-muted-foreground">
                  <Text>Don't want to log in? No worries, it's optional. </Text>
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
                  Continue to the Home page
                </Link>
              </SignedIn>
            </CardFooter>
          </div>
        </Card>
      </div>
    </div>
  );
}
