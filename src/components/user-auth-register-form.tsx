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
import { useRouter, useSearchParams } from "next/navigation";
import { UserForm } from "@/components/user-form";
import { signUpWithPassword } from "@/actions/users";

type UserAuthRegisterFormProps = {};

export function UserAuthRegisterForm({}: UserAuthRegisterFormProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userAuthRegisterSchema>>({
    resolver: zodResolver(userAuthRegisterSchema),
    mode: "onSubmit",
    defaultValues: {
      // name: undefined,
      email: undefined,
      password: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof userAuthRegisterSchema>) {
    setLoading(true);
    toast.promise(signUpWithPassword(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      // success: () => {
      //   // form.reset();
      //   // router.push(
      //   //   `/auth/login?${
      //   //     searchParams?.get("from")
      //   //       ? `?from=${searchParams?.get("from")}`
      //   //       : ""
      //   //   }`,
      //   // );

      //   return "your data was saved. login now.";
      // },
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* <UserForm.name form={form as any} loading={loading} /> */}

          <UserForm.email form={form as any} loading={loading} />
          <UserForm.password form={form as any} loading={loading} />

          <Button className="w-full" disabled={loading}>
            {loading && <Icons.spinner />}
            Sign up with email
          </Button>
        </form>
      </Form>
    </>
  );
}
