"use client";

import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTriggerProps } from "@radix-ui/react-dialog";

export type DialogResponsiveProps = {
  confirmButton?: React.ReactNode;
  content?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
} & Omit<DialogTriggerProps, "content">;

export function DialogResponsive({
  confirmButton,
  content,
  title = "Are you sure you want to proceed?",
  description = (
    <>
      Please confirm that all the provided information is accurate.
      <br /> This action cannot be undone.
    </>
  ),
  ...props
}: DialogResponsiveProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild {...props} />
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="max-w-prose">
              {description}
            </DialogDescription>
          </DialogHeader>
          {content}

          <DialogFooter>
            {confirmButton}

            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild {...props} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription className="max-w-prose">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {content}

        <DrawerFooter>
          {confirmButton}

          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
