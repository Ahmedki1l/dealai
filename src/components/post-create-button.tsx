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
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function PostCreateButton({
  caseStudy,
  project,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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

    // Schedule the post and handle the promise
    toast.promise(createPost(data, project), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        setOpen(false);

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
              className="space-y-2 md:p-0"
            >
              <PostForm.description form={form as any} loading={loading} />
              {/* <PostForm.imageDescription form={form as any} loading={loading} /> */}
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
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
