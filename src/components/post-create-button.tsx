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

type PostCreateButtonProps = {
  caseStudy: CaseStudy;
  project: Project;
} & DialogResponsiveProps;

export function PostCreateButton({
  caseStudy,
  project,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postCreateFormSchema>>({
    resolver: zodResolver(postCreateFormSchema),
    defaultValues: {
      caseStudyId: caseStudy?.["id"],
      description: undefined,
      noOfWeeks: undefined,
      imageDescription: undefined,
      postAt: undefined,
      title:'X',
      platform: 'Y',
    },
  });

  

  console.log(form.formState.errors);

  async function onSubmit(data: z.infer<typeof postCreateFormSchema>) {
    setLoading(true);
    let weeks = data.noOfWeeks ? parseInt(data.noOfWeeks, 10) : 0;
    const result = {
      input: `create a social media content plan that consists of ${3*weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project.accounts}. The content should be long and includes hashtags and emojis.`,
    };

    console.log(JSON.stringify(result));

    // Define the endpoint URL
    const endpoint = "takamol-advanced-ai.vercel.app/chat/socialmediaplan";

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
      console.log(responseData);

      project.accounts.forEach((acc) => {
        let posts = responseData[acc.toString()];
        let i = 0;
        (posts as any[]).forEach((post) => {
          i++;
          let name = `Post${i}`;
          data.title = name;
          data.platform = acc.toString();
          data.content = post[name];
          toast.promise(
            createPost({
              ...data,
            }),
            { error: (err) => err?.["message"] },
          );
        });
      });

      toast.success("created successfully.");
      setLoading(false);
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
              <PostForm.noOfWeeks form={form as any} loading={loading} />

              {/* <Card>
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
              </Card> */}
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
