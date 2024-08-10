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
import { propertyDeleteSchema } from "@/validations/properties";
import { deleteProperty } from "@/actions/properties";
import { DialogResponsive, DialogResponsiveProps } from "@/components/dialog";
import { Property } from "@prisma/client";

type PropertyDeleteButtonProps = {
  property: Pick<Property, "id">;
} & Omit<DialogResponsiveProps, "open" | "setOpen" | "property">;

export function PropertyDeleteButton({
  property,
  ...props
}: PropertyDeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof propertyDeleteSchema>>({
    resolver: zodResolver(propertyDeleteSchema),
    defaultValues: {
      id: property?.["id"],
    },
  });

  function onSubmit(data: z.infer<typeof propertyDeleteSchema>) {
    setLoading(true);
    toast.promise(deleteProperty(data), {
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
      title="Delete Property"
      description="This step is essential for informing patients about the treatments available at your property."
      open={open}
      setOpen={setOpen}
      {...props}
    />
  );
}
