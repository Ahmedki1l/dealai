"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { CaseStudy, Post } from "@prisma/client";
import Link from "next/link";
import { PostDeleteButton } from "@/components/post-delete-button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Post & Pick<CaseStudy, "projectId">>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["projectId"]}/${r?.["caseStudyId"]}/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["title"]}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "postAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheduled At" />
    ),
    cell: ({ row: { original: r } }) => (
      <div>
        {new Date(r?.["postAt"] ?? "")?.toLocaleDateString()}
        {" - "}
        {new Date(r?.["postAt"] ?? "")?.toLocaleTimeString()}
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
            {/* <CaseStudyUpdateForm caseStudy={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Edit
              </Button>
            </CaseStudyUpdateForm> */}

            <PostDeleteButton asChild post={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Delete
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Button>
            </PostDeleteButton>
          </DataTableRowActions>
        </>
      );
    },
  },
];
