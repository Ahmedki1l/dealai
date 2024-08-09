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
import { postUpdateScheduleSchema } from "@/validations/posts";
import { updatePost } from "@/actions/posts";
import { PostForm } from "@/components/post-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Post } from "@prisma/client";

type PostUpdateScheduleButtonProps = {
  post: Post;
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function PostUpdateScheduleButton({
  post,
  ...props
}: PostUpdateScheduleButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postUpdateScheduleSchema>>({
    resolver: zodResolver(postUpdateScheduleSchema),
    defaultValues: { ...post, postAt: post?.["postAt"] ?? undefined },
  });

  async function onSubmit(data: z.infer<typeof postUpdateScheduleSchema>) {
    setLoading(true);
    toast.promise(updatePost(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        setOpen(false);
        return "scheduled successfully.";
      },
    });
  }

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <PostForm.postAt form={form as any} loading={loading} />
            </form>
          </Form>
        </>
      }
      title="Update Schedule"
      description="This step is essential for informing patients about the treatments available at your post."
      {...props}
    />
  );
}
