"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import {
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
// import { AppointmentUpdateButton } from "@/components/appointment-update-button";
// import { AppointmentScheduleButton } from "@/components/appointment-schedule-button";
// import { AppointmentRescheduleButton } from "@/components/appointment-rescheduled-button";
// import { AppointmentCompleteButton } from "@/components/appointment-complete-button";
// import { AppointmentOutOfDateButton } from "@/components/appointment-out-of-date-button";
// import { AppointmentCancelButton } from "@/components/appointment-cancel-button";
// import { AppointmentDeleteButton } from "@/components/appointment-delete-button";
import { Icons } from "@/components/icons";
import { CaseStudy, Post, Project } from "@prisma/client";
import { ProjectUpdateForm } from "@/components/project-update-form";
import Link from "next/link";
import { ProjectDeleteButton } from "@/components/project-delete-button";
import { CardDescription, CardTitle } from "@/components/ui/card";

export const columns: ColumnDef<
  Project & { caseStudy: (CaseStudy & { posts: Post[] })[] }
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({
          variant: "link",
          className: "flex-col items-start justify-start",
        })}
      >
        <CardTitle>{r?.["title"]}</CardTitle>
        {/* <CardDescription>
          {[r?.["distinct"], r?.["city"], r?.["country"]].join(", ")}
        </CardDescription> */}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Case Study" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["caseStudy"]?.["length"] ? <Icons.check /> : <Icons.x />}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Audience" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["caseStudy"]?.["length"] ? <Icons.check /> : <Icons.x />}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posts" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["caseStudy"]?.reduce(
          (acc, e) => acc + e?.["posts"]?.["length"],
          0,
        )}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "accounts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platforms" />
    ),
    cell: ({ row: { original: r } }) => (
      <div className="flex items-center gap-2">
        {r?.["accounts"]?.map((e, i) =>
          e === "Facebook" ? (
            <Icons.facebook key={i} />
          ) : e === "Instagram" ? (
            <Icons.instagram key={i} />
          ) : e === "LinkedIn" ? (
            <Icons.linkedIn key={i} />
          ) : e === "Twitter" ? (
            <Icons.twitter key={i} />
          ): (
            "---"
          ),
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row: { original: r } }) => {
      return (
        <>
          <DataTableRowActions>
            <ProjectUpdateForm project={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Edit
              </Button>
            </ProjectUpdateForm>
            <DropdownMenuSeparator />

            <ProjectDeleteButton asChild project={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Delete
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Button>
            </ProjectDeleteButton>
          </DataTableRowActions>
        </>
      );
    },
  },
];
