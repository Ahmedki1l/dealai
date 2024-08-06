import { Metadata } from "next";
import { db } from "@/lib/db";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { BackButton } from "@/components/back-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type CaseStudyProps = Readonly<{
  params: { "project-id": string; "case-study-id": string; "post-id": string };
}>;

export const metadata: Metadata = { title: "CaseStudy" };
export default async function CaseStudy({
  params: {
    "project-id": projectId,
    "case-study-id": caseStudyId,
    "post-id": postId,
  },
}: CaseStudyProps) {
  const post = await db.post.findFirst({
    include: { caseStudy: { include: { project: true } } },
    where: {
      id: postId,
    },
  });

  if (!post)
    return (
      <div className="container flex min-h-screen items-center justify-center py-6">
        <EmptyPlaceholder className="border-none">
          <EmptyPlaceholder.Icon name="empty" />
          <EmptyPlaceholder.Title>
            Oops, No Such CaseStudy.
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
                {post?.["caseStudy"]?.["project"]?.["title"]}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/projects/${projectId}/${caseStudyId}`}
              >
                {post?.["caseStudy"]?.["title"]}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post?.["title"]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {post?.["title"]}
            </h2>
            <p className="text-muted-foreground">Here&apos;s your post.</p>
          </div>

          <div>
            {/* <CaseStudyCreateButton>
              <Button>Create Case Study</Button>
            </CaseStudyCreateButton> */}
          </div>
        </div>
      </div>
    </div>
  );
}
