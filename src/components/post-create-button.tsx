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
import { postCreateSchema } from "@/validations/posts";
import { createPost } from "@/actions/posts";
import { PostForm } from "@/components/post-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { CaseStudy } from "@prisma/client";
import { Project } from "@prisma/client";

type PostCreateButtonProps = {
  caseStudy: CaseStudy;
  project: Project;
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function PostCreateButton({
  caseStudy,
  project,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      caseStudyId: caseStudy?.["id"],
      title: "x",
      content: "x",
      platform: "FACEBOOK",
      postAt: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof postCreateSchema>) {
    setLoading(true);

    // Schedule the post and handle the promise
    toast.promise(createPost(data, project), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        // router.refresh();
        // form.reset();
        // setOpen(false);

        return "created successfully.";
      },
    });
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <PostForm.description form={form as any} loading={loading} />
              <PostForm.noOfWeeks form={form as any} loading={loading} />
              <PostForm.campaignType form={form as any} loading={loading} />
              <PostForm.contentLength form={form as any} loading={loading} />
            </form>
          </Form>
        </>
      }
      title="Create Post"
      description="This step is essential for informing patients about the treatments available at your post."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
