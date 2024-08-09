"use client";

import { useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { userAuthRegisterSchema } from "@/validations/users";
import { UserForm } from "@/components/user-form";
import { signInWithGoogle, signUpWithPassword } from "@/actions/users";

type UserAuthRegisterFormProps = {};

export function UserAuthRegisterForm({}: UserAuthRegisterFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userAuthRegisterSchema>>({
    resolver: zodResolver(userAuthRegisterSchema),
  });

  function onSubmit(data: z.infer<typeof userAuthRegisterSchema>) {
    setLoading(true);
    toast.promise(signUpWithPassword(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
    });
  }
  return (
    <>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UserForm.name
              form={form}
              loading={loading || isGoogleLoading || isFacebookLoading}
            />

            <UserForm.email
              form={form}
              loading={loading || isGoogleLoading || isFacebookLoading}
            />
            <UserForm.password
              form={form}
              loading={loading || isGoogleLoading || isFacebookLoading}
            />

            <Button
              className="w-full"
              disabled={loading || isGoogleLoading || isFacebookLoading}
            >
              {loading && <Icons.spinner />}
              Sign Up with Email
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
            Sign Up with Facebook
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
            Sign Up with Google
          </Button>
        </div>
      </div>
    </>
  );
}
