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
import { signInWithPassword } from "@/actions/users";

type UserAuthLoginFormProps = {};

export function UserAuthLoginForm({}: UserAuthLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UserForm.email form={form} loading={loading} />
          <UserForm.password form={form} loading={loading} />

          <Button className="w-full" disabled={loading}>
            {loading && <Icons.spinner />}
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
