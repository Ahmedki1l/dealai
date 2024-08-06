"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

type DataTableRowActionsProps = {
  children?: React.ReactNode;
};

export function DataTableRowActions({ children }: DataTableRowActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted"
          >
            <Icons.dotsHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full min-w-40">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
