import type { Metadata } from "next";

import { Icons } from "@/components/icons";
import { Suspense } from "react";
import { UserAuthLoginForm } from "@/components/user-auth-login-form";
import Link from "next/link";

type LoginProps = Readonly<{}>;

export const metadata: Metadata = { title: "Login" };
export default async function Login({}: LoginProps) {
  return (
    <div className="grid min-h-[700px] flex-1 items-center justify-center overflow-auto lg:grid-cols-2">
      {/* <BackButton variant="ghost" className="absolute right-4 top-4 gap-2" /> */}

      <section className="bg-muted text-primary-foreground container relative hidden h-full flex-col p-10 lg:flex dark:border-r">
        <div className="bg-primary absolute inset-0" />
        <p className="z-20 flex items-center text-lg font-medium">
          <Icons.logo />
          Acme Inc
        </p>

        <div className="z-20 mt-auto">
          <blockquote className="space-y-2 italic">
            <p className="text-lg">
              &ldquo;Since partnering with Acme Inc, our sales have increased by
              40% and customer satisfaction has skyrocketed. Their platform has
              streamlined our operations and boosted our business growth.&rdquo;
            </p>
            <footer className="text-sm">
              Alex Thompson, CEO of Thompson Enterprises
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back! 🎉
          </h1>
          <p className="text-muted-foreground text-sm">
            Join our community and unlock amazing features to streamline your
            work and boost your productivity.
          </p>
        </div>
        <div className="grid gap-6">
          <Suspense>
            <UserAuthLoginForm />
          </Suspense>

          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign up
            </Link>{" "}
            .
          </p>
        </div>
      </section>
    </div>
  );
}
