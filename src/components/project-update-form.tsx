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
import { projectUpdateFormSchema } from "@/validations/projects";
import { ProjectForm } from "@/components/project-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Project } from "@prisma/client";
import { updateProject } from "@/actions/projects";
type ProjectUpdateFormProps = {
  project: Project;
} & DialogResponsiveProps;

export function ProjectUpdateForm({
  project: { accounts: projectAccounts, ...project },
  ...props
}: ProjectUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectUpdateFormSchema>>({
    resolver: zodResolver(projectUpdateFormSchema),
    defaultValues: {
      ...project,
      // address: project?.["address"] ?? "",
      // state: project?.["state"] ?? "",
      // city: project?.["city"] ?? "",
      // country: project?.["country"] ?? "",
      // zip: project?.["zip"] ?? "",
      accounts:
        projectAccounts &&
        Array.isArray(JSON.parse(projectAccounts?.toString() ?? ""))
          ? JSON.parse(projectAccounts?.toString())?.map((p: string) => ({
              value: p,
            }))
          : [],
    },
  });
  const accounts = useFieldArray({
    name: "accounts",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof projectUpdateFormSchema>) {
    setLoading(true);
    toast.promise(
      updateProject({
        ...data,
        accounts: data?.["accounts"].map((p) => p?.["value"]),
      }),
      {
        finally: () => setLoading(false),
        error: (err) => err?.["message"],
        success: () => {
          router.refresh();
          form.reset();
          return "updated successfully.";
        },
      },
    );
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
              <ProjectForm.title form={form as any} loading={loading} />
              <ProjectForm.description form={form as any} loading={loading} />

              <div className="grid gap-4 md:grid-cols-2">
                <ProjectForm.distinct form={form as any} loading={loading} />
                <ProjectForm.city form={form as any} loading={loading} />
                <ProjectForm.country form={form as any} loading={loading} />
                <ProjectForm.type form={form as any} loading={loading} />
                <ProjectForm.spaces form={form as any} loading={loading} />
              </div>
              <Card>
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
                      onClick={() => accounts?.append({ value: "" })}
                      disabled={accounts?.fields?.["length"] == 4}
                    >
                      <Icons.add />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProjectForm.accounts
                    accounts={accounts}
                    form={form as any}
                    loading={loading}
                  />
                </CardContent>
              </Card>
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
