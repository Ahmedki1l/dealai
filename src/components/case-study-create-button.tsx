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
import { caseStudyCreateFormSchema } from "@/validations/case-studies";
import { createCaseStudy } from "@/actions/case-studies";
import { CaseStudyForm } from "@/components/case-study-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";
import { convertBase64 } from "@/lib/utils";

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

  const form = useForm<z.infer<typeof caseStudyCreateFormSchema>>({
    resolver: zodResolver(caseStudyCreateFormSchema),
    defaultValues: {
      projectId: project?.["id"],
      content: "x",
      targetAudience: "x",
      pros: "x",
      cons: "x",
      hashtags: "x",
    },
  });

  async function onSubmit(data: z.infer<typeof caseStudyCreateFormSchema>) {
    setLoading(true);

    toast.promise(
      createCaseStudy(
        {
          ...data,
          refImages: data?.refImages?.map((e) => e?.base64),
        },
        project,
      ),
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
              <CaseStudyForm.refImages form={form as any} loading={loading} />
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
