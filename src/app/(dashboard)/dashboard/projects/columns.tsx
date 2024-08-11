"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import {
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { CaseStudy, Post, Project, Property } from "@prisma/client";
import { ProjectUpdateForm } from "@/components/project-update-form";
import Link from "next/link";
import { ProjectDeleteButton } from "@/components/project-delete-button";
import { CardTitle } from "@/components/ui/card";
import { platforms } from "@/db/enums";

export const columns: ColumnDef<
  Project & {
    caseStudy: (CaseStudy & { posts: Post[] })[];
    properties: Property[];
  }
>[] = [
  {
    accessorKey: "title",
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
    accessorKey: "caseStudy",
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
    accessorKey: "caseStudy",
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
    accessorKey: "properties",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Properties" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["properties"]?.["length"]}
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "caseStudy",
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
    accessorKey: "platforms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platforms" />
    ),
    cell: ({ row: { original: r } }) => (
      <div className="flex items-center gap-2">
        {r?.["platforms"]?.map((e, i) => {
          const p = platforms.find((p) => p?.["value"] === e);
          if (!p) return "---";

          const Icon = Icons?.[p?.["icon"]] ?? null;

          return <Icon key={i} />;
        })}
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
