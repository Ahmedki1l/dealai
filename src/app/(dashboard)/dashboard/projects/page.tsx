import type { Metadata } from "next";

import { DataTable } from "@/components/data-table";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { db } from "@/lib/db";
import { getAuth } from "@/lib/auth";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { ProjectCreateButton } from "@/components/project-create-button";

type ProjectsProps = Readonly<{}>;

export const metadata: Metadata = { title: "Projects" };
export default async function Projects({}: ProjectsProps) {
  const user = (await getAuth())?.["user"]!;

  const projects = await db.project.findMany({
    include: { caseStudy: { include: { posts: true } } },
    where: {
      userId: user?.["id"],
    },
  });

  if (!projects?.["length"])
    return (
      <div className="container flex min-h-screen items-center justify-center py-6">
        <EmptyPlaceholder className="border-none">
          <EmptyPlaceholder.Icon name="empty" />
          <EmptyPlaceholder.Title>Oops, No Projects.</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            you have not created you project yet. start working with us.
          </EmptyPlaceholder.Description>

          <ProjectCreateButton user={user}>
            <Button>Create Project</Button>
          </ProjectCreateButton>
        </EmptyPlaceholder>
      </div>
    );

  return (
    <div className="container flex-1 py-6">
      <div className="flex flex-col gap-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your projects.
            </p>
          </div>
          <div>
            <ProjectCreateButton user={user}>
              <Button>Create Project</Button>
            </ProjectCreateButton>
          </div>
        </div>
        <DataTable
          data={projects}
          columns={columns as any}
          filterBy="name"
          filterOptions={[]}
        />
      </div>
    </div>
  );
}
