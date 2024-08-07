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
      title: "X",
      platform: "Y",
    },
  });

  async function onSubmit(data: z.infer<typeof postCreateFormSchema>) {
    setLoading(true);
    let weeks = data.noOfWeeks ? parseInt(data.noOfWeeks, 10) : 0;
    let noOfPostsPerWeek = 3;

    if (
      data.campaignType === "BRANDING_AWARENESS" ||
      data.campaignType === "ENGAGEMENT"
    ) {
      noOfPostsPerWeek = 5;
    }

    const result = {
      input: `create a social media content plan that consists of ${noOfPostsPerWeek * weeks} posts for each platform for a period of ${data.noOfWeeks} weeks, for the platforms ${project.accounts}. The content should be ${data.contentLength} and includes hashtags and emojis. The campaign is: ${data.campaignType}.`,
    };

    console.log(JSON.stringify(result));

    const domain = process.env.NEXT_PUBLIC_AI_API;

    // Define the endpoint URL
    const endpoint = domain + "/chat/socialmediaplan";

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

        // Scheduling
        const startDate = new Date();
        let currentDate = new Date(startDate.getTime());
        currentDate.setDate(currentDate.getDate() + 1);

        // Determine valid posting days based on number of posts
        let daysToPost: number[] = [];
        if (noOfPostsPerWeek === 3) {
          daysToPost = [0, 2, 4]; // Sunday, Tuesday, Thursday
        } else if (noOfPostsPerWeek === 5) {
          daysToPost = [0, 1, 2, 3, 4]; // Sunday to Thursday
        }

        (posts as any[]).forEach((post) => {
          // Find the next valid posting day
          let flag = daysToPost.includes(currentDate.getDay());
          while (
            currentDate.getDay() === 5 ||
            currentDate.getDay() === 6 ||
            !flag
          ) {
            currentDate.setDate(currentDate.getDate() + 1);
            flag = daysToPost.includes(currentDate.getDay());
          }

          // Randomize the posting time between 11 AM and 8 PM
          const randomHour = Math.floor(Math.random() * (20 - 11) + 11); // Random hour between 11 and 19
          const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59

          currentDate.setHours(randomHour, randomMinute, 0); // Set random hour and minute, seconds to 0

          // Create post name and update data object
          let name = `Post${++i}`;
          data.title = name;
          data.platform = acc.toString();
          data.content = post[name];
          data.postAt = new Date(currentDate.getTime());
          console.log(data.postAt);

          // Schedule the post and handle the promise
          toast.promise(createPost(data, project), {
            finally: () => setLoading(false),
            error: (err) => err?.["message"],
            success: () => {
              router.refresh();
              form.reset();

              return "created successfully.";
            },
          });
          currentDate.setDate(currentDate.getDate() + 1);
        });
      });
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
              <PostForm.campaignType form={form as any} loading={loading} />
              <PostForm.contentLength form={form as any} loading={loading} />

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
