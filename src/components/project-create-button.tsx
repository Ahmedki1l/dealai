"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { z as Z } from "@/lib/zod";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProjectCreateButtonProps = { user: User } & DialogResponsiveProps;

export function ProjectCreateButton({
  user,
  ...props
}: ProjectCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectCreateFormSchema>>({
    resolver: zodResolver(projectCreateFormSchema),
    defaultValues: {
      userId: user?.["id"],
      title: undefined,
      description: undefined,
      // address: undefined,
      // state: undefined,
      // city: undefined,
      // country: undefined,
      // zip: undefined,
      accounts: [],
    },
  });

  const accounts = useFieldArray({
    name: "accounts",
    control: form.control,
  });

  async function onSubmit(data: z.infer<typeof projectCreateFormSchema>) {
    setLoading(true);
    toast.promise(
      createProject({
        ...data,
        accounts: data.accounts.map((account) => account.value),
      }),
      {
        finally: () => setLoading(false),
        error: (err) => err?.["message"],
        success: () => {
          router.refresh();
          form.reset();
          return "Project created successfully.";
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
                      onClick={() => accounts?.append({ value: "Facebook" })}
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
      title="Create Project"
      description="This step is essential for informing patients about the treatments available at your project."
      {...props}
    />
  );
}
