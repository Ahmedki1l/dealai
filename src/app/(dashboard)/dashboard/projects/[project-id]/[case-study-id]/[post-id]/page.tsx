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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
        </div>

        <main className="space-y-5">
          <div className="grid gap-10 md:grid-cols-[auto,1fr]">
            <div>
              <img
                src="/images/login.png"
                className="max-h-96 object-cover"
                alt=""
              />
            </div>

            <div>
              {post.content}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>AI Details</CardTitle>
                <CardDescription>
                  {new Date(post?.["createdAt"] ?? "")?.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-md font-bold">Title</Label>
                  <CardDescription>{post?.["title"]}</CardDescription>
                </div>

                <div>
                  <Label className="text-md font-bold">Description</Label>
                  <CardDescription>{post?.["description"]}</CardDescription>
                </div>

                <div>
                  <Label className="text-md font-bold">Image Description</Label>
                  <CardDescription>
                    {post?.["imageDescription"]}
                  </CardDescription>
                </div>

                <div>
                  <Label className="text-md font-bold">Accounts</Label>
                  <CardDescription>{post?.["accounts"]}</CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
