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
import { caseStudyDeleteSchema } from "@/validations/case-studies";
import { deleteCaseStudy } from "@/actions/case-studies";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { CaseStudy } from "@prisma/client";

type CaseStudyDeleteButtonProps = {
  caseStudy: Pick<CaseStudy, "id">;
} & DialogResponsiveProps;

export function CaseStudyDeleteButton({
  caseStudy,
  ...props
}: CaseStudyDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof caseStudyDeleteSchema>>({
    resolver: zodResolver(caseStudyDeleteSchema),
    defaultValues: {
      id: caseStudy?.["id"],
    },
  });

  function onSubmit(data: z.infer<typeof caseStudyDeleteSchema>) {
    setLoading(true);
    toast.promise(deleteCaseStudy(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        return "deleted successfully.";
      },
    });
  }

  return (
    <DialogResponsive
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
      title="Delete Case Study"
      description="This step is essential for informing patients about the treatments available at your caseStudy."
      {...props}
    />
  );
}
