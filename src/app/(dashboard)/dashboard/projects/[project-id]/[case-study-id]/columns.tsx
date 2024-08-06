"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { CaseStudy, Post } from "@prisma/client";
import Link from "next/link";
import { PostDeleteButton } from "@/components/post-delete-button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/avatar";
import { Icons } from "@/components/icons";

export const columns: ColumnDef<Post & Pick<CaseStudy, "projectId">>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row: { original: r } }) => (
      <div className="flex items-center py-2">
        <Avatar
          user={{
            name: r?.["title"],
            image: r?.["image"],
          }}
          icon={{
            name: "analytics",
          }}
        />

        <Link
          href={`/dashboard/projects/${r?.["projectId"]}/${r?.["caseStudyId"]}/${r?.["id"]}`}
          className={buttonVariants({ variant: "link", className: "flex-col" })}
        >
          <CardTitle>{r?.["title"]}</CardTitle>
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row: { original: r } }) => (
      <CardDescription>{r?.["description"]}</CardDescription>
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
          e === "FACEBOOK" ? (
            <Icons.facebook key={i} />
          ) : e === "INSTAGRAM" ? (
            <Icons.instagram key={i} />
          ) : e === "LINKEDIN" ? (
            <Icons.linkedIn key={i} />
          ) : (
            "---"
          ),
        )}
      </div>
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
