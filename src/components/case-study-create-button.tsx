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
import { caseStudyCreateSchema } from "@/validations/case-studies";
import { createCaseStudy } from "@/actions/case-studies";
import { CaseStudyForm } from "@/components/case-study-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CaseStudyCreateButtonProps = { project: Project } & Omit<
  DialogResponsiveProps,
  "open" | "setOpen"
>;

export function CaseStudyCreateButton({
  project,
  ...props
}: CaseStudyCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof caseStudyCreateSchema>>({
    resolver: zodResolver(caseStudyCreateSchema),
    defaultValues: {
      projectId: project?.["id"],
      content: "x",
      targetAudience: "x",
      pros: "x",
      cons: "x",
      hashtags: "x",

      // later handling
      type: "APARTMENT",
      refImages: ["x"],
    },
  });

  async function onSubmit(data: z.infer<typeof caseStudyCreateSchema>) {
    setLoading(true);

    toast.promise(createCaseStudy(data, project), {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <CaseStudyForm.title form={form as any} loading={loading} />
              <CaseStudyForm.description form={form as any} loading={loading} />

              <Card>
                <CardHeader>
                  <CardTitle>Unit Features</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  <CaseStudyForm.units form={form as any} loading={loading} />
                  <CaseStudyForm.space form={form as any} loading={loading} />
                  <CaseStudyForm.rooms form={form as any} loading={loading} />
                  <CaseStudyForm.floors form={form as any} loading={loading} />
                  <CaseStudyForm.bathrooms
                    form={form as any}
                    loading={loading}
                  />
                  <CaseStudyForm.finishing
                    form={form as any}
                    loading={loading}
                  />
                  <CaseStudyForm.garden form={form as any} loading={loading} />
                  <CaseStudyForm.pool form={form as any} loading={loading} />
                  <CaseStudyForm.view form={form as any} loading={loading} />
                  <CaseStudyForm.recipients
                    form={form as any}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </>
      }
      title="Create Case Study"
      description="This step is essential for informing patients about the treatments available at your caseStudy."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
