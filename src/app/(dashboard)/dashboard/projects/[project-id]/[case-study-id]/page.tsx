import { Metadata } from "next";
import { db } from "@/lib/db";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { PostCreateButton } from "@/components/post-create-button";
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
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/image";
import { Icons } from "@/components/icons";
import { PostUpdateContentButton } from "@/components/post-update-content-button";
import { PostUpdateScheduleButton } from "@/components/post-update-schedule-button";

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

  const facebookPosts = caseStudy?.["posts"].filter(
    (e) => e?.["platform"] === "Facebook",
  );
  const linkedInPosts = caseStudy?.["posts"].filter(
    (e) => e?.["platform"] === "LinkedIn",
  );
  const instagramPosts = caseStudy?.["posts"].filter(
    (e) => e?.["platform"] === "Instagram",
  );
  const twitterPosts = caseStudy?.["posts"].filter(
    (e) => e?.["platform"] === "Twitter",
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
              <AccordionContent>{caseStudy?.["content"]}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="target-audience">
              <AccordionTrigger>Target Audience</AccordionTrigger>
              <AccordionContent>
                {caseStudy?.["targetAudience"]}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pros">
              <AccordionTrigger>Pros</AccordionTrigger>
              <AccordionContent>{caseStudy?.["pros"]}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="cons">
              <AccordionTrigger>Cons</AccordionTrigger>
              <AccordionContent>{caseStudy?.["cons"]}</AccordionContent>
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
            <PostCreateButton caseStudy={caseStudy} project={caseStudy.project}>
              <Button>Create Post</Button>
            </PostCreateButton>
          </div>
        </div>
        <section className="space-y-6">
          <div className="mb-8 space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
            <p className="text-sm text-muted-foreground">
              Navigate to get what you want.
            </p>
          </div>

          <div>
            <div className="mb-4 space-y-0.5">
              <p className="flex items-center gap-2 text-sm">
                <Icons.facebook /> Facebook Posts
              </p>
            </div>
            <Carousel>
              <CarouselContent>
                {facebookPosts.map((e, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card className="overview-hidden">
                      <CardHeader className="rounded-none p-0">
                        <Image
                          src={e?.["image"]!}
                          alt=""
                          className="aspect-square rounded-none"
                        />
                      </CardHeader>
                      <CardContent className="p-2 text-sm">
                        <p className="line-clamp-6">{e?.["content"]}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">
                          <PostUpdateContentButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.edit />
                            </Button>
                          </PostUpdateContentButton>

                          <Button variant="ghost" size="icon">
                            <Icons.image />
                          </Button>
                          <PostUpdateScheduleButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.calender />
                            </Button>
                          </PostUpdateScheduleButton>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(e?.["createdAt"]).toLocaleDateString()}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div>
            <div className="mb-4 space-y-0.5">
              <p className="flex items-center gap-2 text-sm">
                <Icons.linkedIn /> LinkedIn Posts
              </p>
            </div>
            <Carousel>
              <CarouselContent>
                {linkedInPosts.map((e, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card className="overview-hidden">
                      <CardHeader className="rounded-none p-0">
                        <Image
                          src={e?.["image"]!}
                          alt=""
                          className="aspect-square rounded-none"
                        />
                      </CardHeader>
                      <CardContent className="p-2 text-sm">
                        <p className="line-clamp-6">{e?.["content"]}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">
                          <PostUpdateContentButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.edit />
                            </Button>
                          </PostUpdateContentButton>

                          <Button variant="ghost" size="icon">
                            <Icons.image />
                          </Button>
                          <PostUpdateScheduleButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.calender />
                            </Button>
                          </PostUpdateScheduleButton>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(e?.["createdAt"]).toLocaleDateString()}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div>
            <div className="mb-4 space-y-0.5">
              <p className="flex items-center gap-2 text-sm">
                <Icons.instagram /> Instagram Posts
              </p>
            </div>
            <Carousel>
              <CarouselContent>
                {instagramPosts.map((e, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card className="overview-hidden">
                      <CardHeader className="rounded-none p-0">
                        <Image
                          src={e?.["image"]!}
                          alt=""
                          className="aspect-square rounded-none"
                        />
                      </CardHeader>
                      <CardContent className="p-2 text-sm">
                        <p className="line-clamp-6">{e?.["content"]}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">
                          <PostUpdateContentButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.edit />
                            </Button>
                          </PostUpdateContentButton>

                          <Button variant="ghost" size="icon">
                            <Icons.image />
                          </Button>
                          <PostUpdateScheduleButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.calender />
                            </Button>
                          </PostUpdateScheduleButton>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(e?.["createdAt"]).toLocaleDateString()}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div>
            <div className="mb-4 space-y-0.5">
              <p className="flex items-center gap-2 text-sm">
                <Icons.twitter /> Twitter Posts
              </p>
            </div>
            <Carousel>
              <CarouselContent>
                {twitterPosts.map((e, i) => (
                  <CarouselItem
                    key={i}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <Card className="overview-hidden">
                      <CardHeader className="rounded-none p-0">
                        <Image
                          src={e?.["image"]!}
                          alt=""
                          className="aspect-square rounded-none"
                        />
                      </CardHeader>
                      <CardContent className="p-2 text-sm">
                        <p className="line-clamp-6">{e?.["content"]}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between gap-2 p-2">
                        <div className="flex items-center gap-2">
                          <PostUpdateContentButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.edit />
                            </Button>
                          </PostUpdateContentButton>

                          <Button variant="ghost" size="icon">
                            <Icons.image />
                          </Button>
                          <PostUpdateScheduleButton post={e as any}>
                            <Button variant="ghost" size="icon">
                              <Icons.calender />
                            </Button>
                          </PostUpdateScheduleButton>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(e?.["createdAt"]).toLocaleDateString()}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </div>
    </div>
  );
}
