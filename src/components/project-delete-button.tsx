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
import { projectDeleteSchema } from "@/validations/projects";
import { deleteProject } from "@/actions/projects";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";

type ProjectDeleteButtonProps = {
  project: Pick<Project, "id">;
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function ProjectDeleteButton({
  project,
  ...props
}: ProjectDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectDeleteSchema>>({
    resolver: zodResolver(projectDeleteSchema),
    defaultValues: {
      id: project?.["id"],
    },
  });

  function onSubmit(data: z.infer<typeof projectDeleteSchema>) {
    setLoading(true);
    toast.promise(deleteProject(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        setOpen(false);
        return "deleted successfully.";
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
      title="Delete Project"
      description="This step is essential for informing patients about the treatments available at your project."
      {...props}
    />
  );
}
