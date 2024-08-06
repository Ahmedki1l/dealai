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
import { postDeleteSchema } from "@/validations/posts";
import { deletePost } from "@/actions/posts";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Post } from "@prisma/client";

type PostDeleteButtonProps = {
  post: Pick<Post, "id">;
} & DialogResponsiveProps;

export function PostDeleteButton({ post, ...props }: PostDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postDeleteSchema>>({
    resolver: zodResolver(postDeleteSchema),
    defaultValues: {
      id: post?.["id"],
    },
  });

  function onSubmit(data: z.infer<typeof postDeleteSchema>) {
    setLoading(true);
    toast.promise(deletePost(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        return "deleted successfully.";
      },
    });
  }

  return (
    <DialogResponsive
      confirmButton={
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                variant="destructive"
                disabled={loading}
                className="w-full md:w-fit"
              >
                {loading && <Icons.spinner />}
                Delete
              </Button>
            </form>
          </Form>
        </>
      }
      title="Delete Post"
      description="This step is essential for informing patients about the treatments available at your post."
      {...props}
    />
  );
}
