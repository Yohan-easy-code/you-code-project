"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/auth/signin-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Account page error:", error);
  }, [error]);

  return (
    <div className="flex w-full justify-center items-center">
      <Card className="w-full max-w-lg mt-10 h-fit">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <CardTitle>You need to be logged in to view this page</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          If you already have an account, please sign in.
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <SignInButton />

          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>

          <Button asChild variant="ghost">
            <Link href="/">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
