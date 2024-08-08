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
import { caseStudyUpdateSchema } from "@/validations/case-studies";
import { updateCaseStudy } from "@/actions/case-studies";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { CaseStudyForm } from "./case-study-form";
import { CaseStudy } from "@prisma/client";

type CaseStudyUpdateFormProps = {
  caseStudy: CaseStudy;
} & Omit<DialogResponsiveProps, "open" | "setOpen">;

export function CaseStudyUpdateForm({
  caseStudy,
  ...props
}: CaseStudyUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof caseStudyUpdateSchema>>({
    resolver: zodResolver(caseStudyUpdateSchema),
    defaultValues: {
      ...caseStudy,
      description: caseStudy?.["description"] ?? "",
      content: caseStudy?.["content"] ?? "",
      targetAudience: caseStudy?.["targetAudience"] ?? "",
      pros: caseStudy?.["pros"] ?? "",
      cons: caseStudy?.["cons"] ?? "",
      hashtags: caseStudy?.["hashtags"] ?? "",
    },
  });

  function onSubmit(data: z.infer<typeof caseStudyUpdateSchema>) {
    setLoading(true);
    toast.promise(
      updateCaseStudy({
        ...data,
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
              <CaseStudyForm.title form={form as any} loading={loading} />
              <CaseStudyForm.description form={form as any} loading={loading} />
            </form>
          </Form>
        </>
      }
      title="Update Case Study"
      description="This step is essential for informing patients about the treatments available at your case study."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
