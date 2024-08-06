"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postCreateFormSchema, postCreateSchema } from "@/validations/posts";
import { createPost } from "@/actions/posts";
import { PostForm } from "@/components/post-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { CaseStudy } from "@prisma/client";
import { Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { db } from "@/lib/db";

type PostCreateButtonProps = { caseStudy: CaseStudy } & DialogResponsiveProps;

export function PostCreateButton({
  caseStudy,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postCreateFormSchema>>({
    resolver: zodResolver(postCreateFormSchema),
    defaultValues: {
      caseStudyId: caseStudy?.["id"],
      title: undefined,
      description: undefined,
      imageDescription: undefined,
      postAt: undefined,
      accounts: [],
    },
  });

  const accounts = useFieldArray({
    name: "accounts",
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof postCreateFormSchema>) {
    setLoading(true);

    const result = {
      input: `create a casestudy about ${data.title}, ${data.description}.`,
    };
    console.log(JSON.stringify(result));

    // Define the endpoint URL
    const endpoint = "http://127.0.0.1:5000/chat/casestudy";

    try {
      // Send data to the server
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      // Handle response from the server
      const responseData = await response.json();
      console.log("Response from server:", responseData);

      toast.promise(
        createPost({
          ...data,
          accounts: data?.["accounts"].map((p) => p?.["value"]),
        }),
        {
          finally: () => setLoading(false),
          error: (err) => err?.["message"],
          success: () => {
            router.refresh();
            form.reset();
            return "created successfully.";
          },
        },
      );
    } catch (error) {
      console.error("Error sending data to the server:", error);
      setLoading(false); // Ensure loading is false on error
    }
  }

  return (
    <DialogResponsive
      confirmButton={
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button disabled={loading} className="w-full md:w-fit">
                {loading && <Icons.spinner />}
                submit
              </Button>
            </form>
          </Form>
        </>
      }
      content={
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="container space-y-2 md:p-0"
            >
              <PostForm.description form={form as any} loading={loading} />
              <PostForm.imageDescription form={form as any} loading={loading} />

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Platforms</CardTitle>
                      <CardDescription>
                        Add account number to your project so patients reach you
                        fast.
                      </CardDescription>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => accounts?.append({ value: "FACEBOOK" })}
                      disabled={accounts?.fields?.["length"] == 4}
                    >
                      <Icons.add />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PostForm.accounts
                    accounts={accounts}
                    form={form as any}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </>
      }
      title="Create Post"
      description="This step is essential for informing patients about the treatments available at your post."
      {...props}
    />
  );
}
