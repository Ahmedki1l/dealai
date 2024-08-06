import { Metadata } from "next";
import { db } from "@/lib/db";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { BackButton } from "@/components/back-button";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { PostCreateButton } from "@/components/post-create-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type CaseStudyProps = Readonly<{
  params: { "project-id": string; "case-study-id": string };
}>;

export const metadata: Metadata = { title: "CaseStudy" };
export default async function CaseStudy({
  params: { "project-id": projectId, "case-study-id": caseStudyId },
}: CaseStudyProps) {
  const caseStudy = await db.caseStudy.findFirst({
    include: { posts: true, project: true },
    where: {
      id: caseStudyId,
    },
  });

  if (!caseStudy)
    return (
      <div className="container flex min-h-screen items-center justify-center py-6">
        <EmptyPlaceholder className="border-none">
          <EmptyPlaceholder.Icon name="empty" />
          <EmptyPlaceholder.Title>
            Oops, No Such Case Study.
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            you have not created you case study yet. start working with us.
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
              <BreadcrumbLink href={`/dashboard/projects/${projectId}`}>
                {caseStudy?.["project"]?.["title"]}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{caseStudy?.["title"]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-4 flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {caseStudy?.["title"]}
          </h2>
          <CardDescription>{caseStudy?.["description"]}</CardDescription>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="content">
              <AccordionTrigger>Case Study Content</AccordionTrigger>
              <AccordionContent>
                {caseStudy?.["content"]}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="target-audience">
              <AccordionTrigger>Target Audience</AccordionTrigger>
              <AccordionContent>
                {caseStudy?.["targetAudience"]}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pros">
              <AccordionTrigger>Pros</AccordionTrigger>
              <AccordionContent>
                {caseStudy?.["prosNcons"]} 
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cons">
              <AccordionTrigger>Cons</AccordionTrigger>
              <AccordionContent>
                {caseStudy?.["cons"]} 
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="my-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Here&apos;s a list of your posts.
            </p>
          </div>

          <div>
            <PostCreateButton caseStudy={caseStudy}>
              <Button>Create Post</Button>
            </PostCreateButton>
          </div>
        </div>
        <DataTable
          data={caseStudy?.["posts"].map((e) => ({ ...e, projectId }))}
          columns={columns as any}
          filterBy="title"
          filterOptions={[]}
        />
      </div>
    </div>
  );
}
