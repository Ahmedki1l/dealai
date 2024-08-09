import { Metadata } from "next";
import { db } from "@/db";
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
import { PostUpdateForm } from "@/components/post-update-form";

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
    <div className="min-h-screen flex-1 overflow-auto">
      <div className="container flex flex-col gap-5 py-6">
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

        <div className="flex max-w-screen-xl flex-1 flex-col gap-6 py-6">
          <PostUpdateForm post={post} />
        </div>
      </div>
    </div>
  );
}
