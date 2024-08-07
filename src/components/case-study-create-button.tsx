"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { z as Z } from "@/lib/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { caseStudyCreateSchema } from "@/validations/case-studies";
import { createCaseStudy } from "@/actions/case-studies";
import { User } from "@/types/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaseStudyForm } from "@/components/case-study-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";
import { id } from "date-fns/locale";

type CaseStudyCreateButtonProps = { project: Project } & DialogResponsiveProps;

export function CaseStudyCreateButton({
  project,
  ...props
}: CaseStudyCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof caseStudyCreateSchema>>({
    resolver: zodResolver(caseStudyCreateSchema),
    defaultValues: {
      projectId: project?.["id"],
      title: undefined,
      description: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof caseStudyCreateSchema>) {
    setLoading(true);

    const result = {
      input:`create a casestudy about ${project.title} ${project.type} located in: ${project.distinct}, ${project.city}, ${project.country}, which has a land space of: ${project.spaces}, ${project.description}. Create the Hashtags for ${project.accounts}`
    }
    console.log(JSON.stringify(result));

    const domain = process.env.NEXT_PUBLIC_AI_API;

    console.log(process.env.NEXT_PUBLIC_AI_API);

    // Define the endpoint URL
    const endpoint = domain + '/chat/casestudy';

    try {
      // Send data to the server
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      });

      // Handle response from the server
      const responseData = await response.json();
      console.log('Response from server:', responseData);
      data.content = responseData['Case_Study'];
      data.targetAudience = responseData['Target_Audience'];
      data.pros = responseData['Pros'];
      data.cons = responseData['Cons'];
      toast.promise(createCaseStudy(data), {
        finally: () => setLoading(false),
        error: (err) => err?.["message"],
        success: () => {
          router.refresh();
          form.reset();
          return "created successfully.";
        },
      });
    } catch (error) {
      console.error('Error sending data to the server:', error);
      setLoading(false); // Ensure loading is false on error
    }
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
              <CaseStudyForm.title form={form} loading={loading} />
              <CaseStudyForm.description form={form} loading={loading} />

              {/* <div className="grid gap-4 md:grid-cols-2">
                <CaseStudyForm.state form={form} loading={loading} />
                <CaseStudyForm.zip form={form} loading={loading} />
                <CaseStudyForm.city form={form} loading={loading} />
                <CaseStudyForm.country form={form} loading={loading} />
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Phone Numbers</CardTitle>
                      <CardDescription>
                        Add phone number to your caseStudy so patients reach you
                        fast.
                      </CardDescription>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => phones?.append({ value: "" })}
                      disabled={phones?.fields?.["length"] == 4}
                    >
                      <Icons.add />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CaseStudyForm.phones
                    phones={phones}
                    form={form}
                    loading={loading}
                  />
                </CardContent>
              </Card> */}
            </form>
          </Form>
        </>
      }
      title="Create Case Study"
      description="This step is essential for informing patients about the treatments available at your caseStudy."
      {...props}
    />
  );
}
