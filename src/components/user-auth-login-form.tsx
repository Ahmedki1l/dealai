"use client";

import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { userAuthLoginSchema } from "@/validations/users";
import { useRouter, useSearchParams } from "next/navigation";
import { UserForm } from "@/components/user-form";
import { signInWithGoogle, signInWithPassword } from "@/actions/users";
import Link from "next/link";

type UserAuthLoginFormProps = {};

export function UserAuthLoginForm({}: UserAuthLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userAuthLoginSchema>>({
    resolver: zodResolver(userAuthLoginSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: z.infer<typeof userAuthLoginSchema>) {
    setLoading(true);
    toast.promise(signInWithPassword(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      // success: () => {
      //   router.push(searchParams?.get("from") ?? "/dashboard");
      //   form.reset();
      //   return "logged in";
      // },
    });
  }
  return (
    <>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UserForm.email
              form={form}
              loading={loading || isGoogleLoading || isFacebookLoading}
            />
            <UserForm.password
              form={form}
              loading={loading || isGoogleLoading || isFacebookLoading}
            />

            <p className="text-end text-xs text-muted-foreground">
              <Link
                href="/forgot-password"
                className="underline underline-offset-4 hover:text-primary"
              >
                Forgot Password?
              </Link>{" "}
            </p>

            <Button
              className="w-full"
              disabled={loading || isGoogleLoading || isFacebookLoading}
            >
              {loading && <Icons.spinner />}
              Sign In with Email
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>
        <div className="w-full space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
            onClick={async () => {
              setIsFacebookLoading(true);
              toast.promise(
                async () => {},
                // signinWithGoogle()
                {
                  error: (err) => err?.["message"],
                },
              );
            }}
            disabled={loading || isGoogleLoading || isFacebookLoading}
          >
            {isFacebookLoading ? <Icons.spinner /> : <Icons.facebook />}
            Sign In with Facebook
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={async () => {
              setIsGoogleLoading(true);
              toast.promise(signInWithGoogle(), {
                error: (err) => err?.["message"],
              });
            }}
            disabled={loading || isGoogleLoading || isFacebookLoading}
          >
            {isGoogleLoading ? <Icons.spinner /> : <Icons.google />}
            Sign In with Google
          </Button>
        </div>
      </div>
    </>
  );
}
