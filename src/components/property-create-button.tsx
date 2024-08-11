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
import {
  propertyCreateFormSchema,
  propertyCreateSchema,
} from "@/validations/properties";
import { createProperty } from "@/actions/properties";
import { PropertyForm } from "@/components/property-form";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { propertyTypes } from "@/db/enums";

type PropertyCreateButtonProps = { project: Pick<Project, "id"> } & Omit<
  DialogResponsiveProps,
  "open" | "setOpen" | "property"
>;

export function PropertyCreateButton({
  project,
  ...props
}: PropertyCreateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof propertyCreateFormSchema>>({
    resolver: zodResolver(propertyCreateFormSchema),
  });

  const { fields, remove, append } = useFieldArray({
    name: "types",
    control: form?.["control"],
  });

  async function onSubmit(data: z.infer<typeof propertyCreateFormSchema>) {
    setLoading(true);
    toast.promise(createProperty(data), {
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
              <div className="flex items-center justify-between gap-4">
                <Label>Type of Assets</Label>
                <Button
                  size="icon"
                  onClick={() =>
                    // @ts-ignore
                    append({
                      properties: [],
                    })
                  }
                  disabled={
                    fields?.["length"] === propertyTypes?.["length"]
                    // ||
                    // (limit ? fields?.["length"] == 4 : false)
                  }
                >
                  <Icons.add />
                </Button>
              </div>

              {fields?.map((field, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-full">
                        <PropertyForm.type
                          typeIndex={i}
                          remove={remove}
                          form={form as any}
                          loading={loading}
                        />
                      </div>

                      {form.watch(`types.${i}.value`) && (
                        <Button
                          size="icon"
                          onClick={() =>
                            // @ts-ignore
                            field?.properties?.push({
                              projectId: project?.["id"],
                            })
                          }
                        >
                          <Icons.add />
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  {field?.["properties"]?.["length"] ? (
                    <CardContent className="space-y-4">
                      {field?.properties?.map((_, j) => (
                        <Card key={j} className="border-green-500">
                          <CardHeader>
                            <div className="flex items-center justify-between gap-4">
                              <CardTitle>Unit {j + 1}</CardTitle>

                              {/* <Button
                                  size="icon"
                                  onClick={() =>
                                    // @ts-ignore
                                    form.setValue(
                                      `types.${i}.properties`,
                                      field?.["properties"]?.filter(
                                        (_, k) => k != j,
                                      ) ?? [],
                                    )
                                  }
                                >
                                  <Icons.x />
                                </Button> */}
                            </div>
                          </CardHeader>

                          <CardContent className="grid grid-cols-3 gap-4">
                            <PropertyForm.title
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.units
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.space
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.finishing
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.floors
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.rooms
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            <PropertyForm.bathrooms
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />

                            <PropertyForm.recipients
                              typeIndex={i}
                              propertyIndex={j}
                              form={form as any}
                              loading={loading}
                            />
                            {form.watch(`types.${i}.value`) === "VILLA" ? (
                              <>
                                <PropertyForm.garden
                                  typeIndex={i}
                                  propertyIndex={j}
                                  form={form as any}
                                  loading={loading}
                                />
                                <PropertyForm.pool
                                  typeIndex={i}
                                  propertyIndex={j}
                                  form={form as any}
                                  loading={loading}
                                />
                                <PropertyForm.view
                                  typeIndex={i}
                                  propertyIndex={j}
                                  form={form as any}
                                  loading={loading}
                                />
                              </>
                            ) : null}
                          </CardContent>
                          {/* <CardFooter>
                            <Button
                              size="icon"
                              onClick={() => {
                                // @ts-ignore
                                field["properties"] =
                                  field?.properties?.filter((_, i) => i != j) ??
                                  [];
                              }}
                            >
                              <Icons.x />
                            </Button>
                          </CardFooter> */}
                        </Card>
                      ))}
                    </CardContent>
                  ) : null}
                </Card>
              ))}
            </form>
          </Form>
        </>
      }
      title="Create Property"
      description="This step is essential for informing patients about the treatments available at your propertys."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
