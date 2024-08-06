"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type BackButtonProps = {} & ButtonProps;
export function BackButton({ children, onClick, ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} {...props}>
      {children ?? (
        <>
          <Icons.chevronLeft />
          Back
        </>
      )}
    </Button>
  );
}
