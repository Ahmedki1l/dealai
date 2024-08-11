"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Link } from "@/components/link";
import { Property } from "@prisma/client";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { PropertyDeleteButton } from "@/components/property-delete-button";

import { CaseStudy, Post } from "@prisma/client";
import { CaseStudyUpdateForm } from "@/components/case-study-update-form";
import { CaseStudyDeleteButton } from "@/components/case-study-delete-button";
import { Icons } from "@/components/icons";
import { CardDescription, CardTitle } from "@/components/ui/card";

export const caseStudyColumns: ColumnDef<CaseStudy & { posts: Post[] }>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["projectId"]}/cases/${r?.["id"]}`}
        className={buttonVariants({
          variant: "link",
          className: "flex-col items-start justify-start",
        })}
      >
        <CardTitle>{r?.["title"]}</CardTitle>
        <CardDescription>{r?.["description"]}</CardDescription>
        {/* <CardDescription>
              {[r?.["distinct"], r?.["city"], r?.["country"]].join(", ")}
            </CardDescription> */}
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Case Study" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["id"]}`}
        className={buttonVariants({ variant: "link" })}
      >
        {r?.["content"] ? <Icons.check /> : <Icons.x />}
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
        {r?.["targetAudience"] ? <Icons.check /> : <Icons.x />}
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
        {r?.["posts"]?.["length"]}
      </Link>
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
            <CaseStudyUpdateForm caseStudy={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Edit
              </Button>
            </CaseStudyUpdateForm>

            <CaseStudyDeleteButton asChild caseStudy={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Delete
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Button>
            </CaseStudyDeleteButton>
          </DataTableRowActions>
        </>
      );
    },
  },
];

export const propertiesColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row: { original: r } }) => (
      <Link
        href={`/dashboard/projects/${r?.["projectId"]}/properties/${r?.["id"]}`}
        className={buttonVariants({
          variant: "link",
          className: "flex-col items-start justify-start",
        })}
      >
        <CardTitle>{r?.["title"]}</CardTitle>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "units",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Units" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "space",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space" />
    ),
  },
  {
    accessorKey: "finishing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Finishing" />
    ),
  },
  {
    accessorKey: "floors",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floors" />
    ),
  },
  {
    accessorKey: "rooms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rooms" />
    ),
  },
  {
    accessorKey: "bathrooms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bathrooms" />
    ),
  },
  {
    accessorKey: "recipients",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipients" />
    ),
  },
  {
    accessorKey: "garden",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Garden" />
    ),
  },
  {
    accessorKey: "pool",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pool" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
  },
  {
    id: "actions",
    cell: ({ row: { original: r } }) => {
      return (
        <>
          <DataTableRowActions>
            {/* <PropertyUpdateForm property={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Edit
              </Button>
            </PropertyUpdateForm> */}

            <PropertyDeleteButton asChild property={r}>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 text-start font-normal"
              >
                Delete
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Button>
            </PropertyDeleteButton>
          </DataTableRowActions>
        </>
      );
    },
  },
];
