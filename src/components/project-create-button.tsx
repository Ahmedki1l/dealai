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
import { projectCreateFormSchema } from "@/validations/projects";
import { createProject } from "@/actions/projects";
import { User } from "@/types/db";
import { ProjectForm } from "@/components/project-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";

type ProjectCreateButtonProps = { user: User } & Omit<
  DialogResponsiveProps,
  "open" | "setOpen"
>;
export function ProjectCreateButton({
  user,
  ...props
}: ProjectCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectCreateFormSchema>>({
    resolver: zodResolver(projectCreateFormSchema),
    defaultValues: { userId: user?.["id"] },
  });

  async function onSubmit(data: z.infer<typeof projectCreateFormSchema>) {
    setLoading(true);
    toast.promise(
      createProject({
        ...data,
        platforms: data.platforms.map((e) => e?.["value"]),
      }),
      {
        finally: () => setLoading(false),
        error: (err) => err?.["message"],
        success: () => {
          router.refresh();
          form.reset();
          setOpen(false);
          return "created successfully.";
        },
      },
    );
  }

  return (
    <DialogResponsive
      open={open}
      setOpen={setOpen}
      confirmButton={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button disabled={loading} className="w-full md:w-fit">
              {loading && <Icons.spinner />}
              submit
            </Button>
          </form>
        </Form>
      }
      content={
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 md:p-0"
            >
              <ProjectForm.title form={form as any} loading={loading} />
              <ProjectForm.description form={form as any} loading={loading} />

              <div className="grid gap-4 sm:grid-cols-3">
                <ProjectForm.distinct form={form as any} loading={loading} />
                <ProjectForm.city form={form as any} loading={loading} />
                <ProjectForm.country form={form as any} loading={loading} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ProjectForm.spaces form={form as any} loading={loading} />
                <ProjectForm.propertiesType
                  form={form as any}
                  loading={loading}
                />
              </div>

              <ProjectForm.platforms form={form as any} loading={loading} />
            </form>
          </Form>
        </>
      }
      title="Create Project"
      description="This step is essential for informing patients about the treatments available at your project."
      {...props}
    />
  );
}
