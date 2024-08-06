"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

type PostCreateButtonProps = { caseStudy: CaseStudy } & DialogResponsiveProps;

export function PostCreateButton({
  caseStudy,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      caseStudyId: caseStudy?.["id"],
      title: undefined,
      description: undefined,
      imageDescription: undefined,
      postAt: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof postCreateSchema>) {
    setLoading(true);
    toast.promise(createPost(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="container space-y-2 md:p-0"
            >
              <PostForm.title form={form as any} loading={loading} />
              <PostForm.description form={form as any} loading={loading} />
              <PostForm.imageDescription form={form as any} loading={loading} />
              {/* <PostForm.imageDescription form={form as any} loading={loading} /> */}
              <PostForm.postAt form={form as any} loading={loading} />
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
