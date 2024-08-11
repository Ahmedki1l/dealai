"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { projectUpdateFormSchema } from "@/validations/projects";
import { ProjectForm } from "@/components/project-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";
import { updateProject } from "@/actions/projects";

type ProjectUpdateFormProps = {
  project: Project;
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function ProjectUpdateForm({
  project,
  ...props
}: ProjectUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectUpdateFormSchema>>({
    resolver: zodResolver(projectUpdateFormSchema),
    defaultValues: {
      ...project,
      description: project?.["description"] ?? undefined,
      platforms: project?.["platforms"]
        ? project?.["platforms"]?.map((p) => ({
            value: p,
          }))
        : [],
      propertyTypes: project?.["propertyTypes"]
        ? project?.["propertyTypes"]?.map((p) => ({
            value: p,
          }))
        : [],
    },
  });

  function onSubmit(data: z.infer<typeof projectUpdateFormSchema>) {
    setLoading(true);
    toast.promise(
      updateProject({
        ...data,
        platforms: data?.["platforms"].map((e) => e?.["value"]),
        propertyTypes: data?.["propertyTypes"].map((e) => e?.["value"]),
      }),
      {
        finally: () => setLoading(false),
        error: (err) => err?.["message"],
        success: () => {
          router.refresh();
          form.reset();
          setOpen(false);
          return "updated successfully.";
        },
      },
    );
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <ProjectForm.title form={form as any} loading={loading} />
              <ProjectForm.description form={form as any} loading={loading} />

              <div className="grid gap-4 sm:grid-cols-2">
                <ProjectForm.distinct form={form as any} loading={loading} />
                <ProjectForm.city form={form as any} loading={loading} />
                <ProjectForm.country form={form as any} loading={loading} />
                <ProjectForm.spaces form={form as any} loading={loading} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ProjectForm.platforms form={form as any} loading={loading} />
              </div>
            </form>
          </Form>
        </>
      }
      title="Update Project"
      description="This step is essential for informing patients about the treatments available at your project."
      {...props}
    />
  );
}
