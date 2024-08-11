import { Metadata } from "next";
import { db } from "@/db";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { BackButton } from "@/components/back-button";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CaseStudyCreateButton } from "@/components/case-study-create-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PropertyCreateButton } from "@/components/property-create-button";
import { caseStudyColumns, propertiesColumns } from "./columns";

type ProjectProps = Readonly<{
  params: { "project-id": string };
}>;

export const metadata: Metadata = { title: "Project" };
export default async function Project({
  params: { "project-id": projectId },
}: ProjectProps) {
  const project = await db.project.findFirst({
    include: {
      caseStudy: { include: { posts: true } },
      properties: true,
    },
    where: {
      id: projectId,
    },
  });

  if (!project)
    return (
      <div className="container flex min-h-screen items-center justify-center py-6">
        <EmptyPlaceholder className="border-none">
          <EmptyPlaceholder.Icon name="empty" />
          <EmptyPlaceholder.Title>
            Oops, No Such Project.
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            you have not created you project yet. start working with us.
          </EmptyPlaceholder.Description>
          <BackButton />
        </EmptyPlaceholder>
      </div>
    );

  return (
    <div className="container flex-1 py-6">
      <div className="flex flex-col gap-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/projects`}>
                Projects
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{project?.["title"]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {project?.["title"]}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your case studies.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="flex flex-col gap-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Case Studies
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s a list of your case studies.
                </p>
              </div>
              <div>
                <CaseStudyCreateButton project={project}>
                  <Button>Create Case Study</Button>
                </CaseStudyCreateButton>
              </div>
            </div>
          </div>

          <DataTable
            data={project?.["caseStudy"]}
            columns={caseStudyColumns}
            filterBy="title"
            filterOptions={[]}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Properties</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your properties.
              </p>
            </div>
            <div>
              <PropertyCreateButton project={project}>
                <Button>Create Property</Button>
              </PropertyCreateButton>
            </div>
          </div>

          <DataTable
            data={project?.["properties"]}
            columns={propertiesColumns}
            filterBy="title"
            filterOptions={[]}
          />
        </div>
      </div>
    </div>
  );
}
