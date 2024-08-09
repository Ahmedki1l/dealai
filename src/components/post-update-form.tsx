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
import { postUpdateSchema } from "@/validations/posts";
import { updatePost } from "@/actions/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "@/components/back-button";
import { PostForm } from "@/components/post-form";
import { Post } from "@prisma/client";

type PostUpdateFormProps = {
  post: Post;
};

export function PostUpdateForm({ post }: PostUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      ...post,
      imageId: post?.["imageId"] ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof postUpdateSchema>) {
    setLoading(true);
    toast.promise(updatePost(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        setOpen(false);
        return "updated successfully.";
      },
    });
  }
  // function isValidUrl(url: string) {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BackButton type="button" variant="ghost" size="sm">
                <Icons.chevronLeft />
                Back
              </BackButton>
              <h1 className="text-md font-semibold">Post Details</h1>
            </div>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                type="button"
                onClick={() => form.reset()}
                variant="outline"
                size="sm"
              >
                Discard
              </Button>
              <Button
                type="submit"
                size="sm"
                className="w-full"
                disabled={loading}
              >
                {loading && <Icons.spinner />}
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="grid gap-4 md:grid-cols-[300px,1fr] lg:grid-cols-3">
        {/* <div
          className={cn(
            "relative h-full min-h-60 flex-col overflow-hidden rounded text-primary-foreground dark:border-r lg:flex",
            // form.watch("image") && `bg-[url(${form.getValues("image")})]`,
          )}
        >
          <div className="absolute inset-0 bg-primary/30" />
          {isValidUrl(form?.watch("image") ?? "") ? (
            <Image src={form?.getValues("image")!} alt="" className="" />
          ) : null}{" "}
          <div className="absolute right-4 top-4 z-50 flex items-center text-lg font-medium">
            <DialogResponsive
              open={open}
              setOpen={setOpen}
              confirmButton={
                <>
                  <DialogClose asChild className="hidden md:block">
                    <Button
                      type="button"
                      disabled={loading}
                      className="w-full md:w-fit"
                    >
                      Confirm
                    </Button>
                  </DialogClose>

                  <DrawerClose asChild type="button" className="md:hidden">
                    <Button disabled={loading} className="w-full md:w-fit">
                      Confirm
                    </Button>
                  </DrawerClose>
                </>
              }
              content={
                <Form {...form}>
                  <form>
                    <PostForm.image form={form } loading={loading} />
                  </form>
                </Form>
              }
              title="Update Image"
              description="This step is essential for informing patients about the treatments available at your post."
            >
              <Button size="icon" variant="secondary">
                <Icons.edit />
              </Button>
            </DialogResponsive>
          </div>
        </div> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid auto-rows-max items-start gap-4 space-y-2 lg:col-span-2 lg:gap-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Post Information</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <PostForm.title form={form as any} loading={true} />
                <PostForm.content form={form as any} loading={loading} />

                <div className="grid gap-4 md:grid-cols-2">
                  <PostForm.contentLength form={form as any} loading={true} />
                  <PostForm.campaignType form={form as any} loading={true} />
                </div>
                <div className="grid items-center gap-4 md:grid-cols-[1fr,1fr]">
                  <PostForm.postAt form={form as any} loading={true} />
                  <PostForm.noOfWeeks form={form as any} loading={true} />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              type="button"
              onClick={() => form.reset()}
              variant="outline"
              size="sm"
            >
              Discard
            </Button>

            <Button
              type="submit"
              size="sm"
              className="w-full"
              disabled={loading}
            >
              {loading && <Icons.spinner />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
