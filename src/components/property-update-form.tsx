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
import { propertyUpdateSchema } from "@/validations/properties";
import { updateProperty } from "@/actions/properties";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { PropertyForm } from "@/components/property-form";
import { Property } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PropertyUpdateFormProps = {
  property: Property;
} & Omit<DialogResponsiveProps, "open" | "setOpen" | "property">;

export function PropertyUpdateForm({
  property,
  ...props
}: PropertyUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof propertyUpdateSchema>>({
    resolver: zodResolver(propertyUpdateSchema),
    defaultValues: {
      ...property,
      pool: property?.["pool"] ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof propertyUpdateSchema>) {
    setLoading(true);
    toast.promise(updateProperty(data), {
      finally: () => setLoading(false),
      error: (err) => err?.["message"],
      success: () => {
        router.refresh();
        form.reset();
        setOpen(false);
        return "updated successfully.";
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
              <PropertyForm.title form={form as any} loading={loading} />
              <PropertyForm.units form={form as any} loading={loading} />
              <PropertyForm.type form={form as any} loading={loading} />

              <Card>
                <CardHeader>
                  <CardTitle>Unit Features</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  <PropertyForm.space form={form as any} loading={loading} />
                  <PropertyForm.rooms form={form as any} loading={loading} />
                  <PropertyForm.floors form={form as any} loading={loading} />
                  <PropertyForm.bathrooms
                    form={form as any}
                    loading={loading}
                  />
                  <PropertyForm.finishing
                    form={form as any}
                    loading={loading}
                  />
                  <PropertyForm.garden form={form as any} loading={loading} />
                  <PropertyForm.pool form={form as any} loading={loading} />
                  <PropertyForm.view form={form as any} loading={loading} />
                  <PropertyForm.recipients
                    form={form as any}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </>
      }
      title="Update Property"
      description="This step is essential for informing patients about the treatments available at your property."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
