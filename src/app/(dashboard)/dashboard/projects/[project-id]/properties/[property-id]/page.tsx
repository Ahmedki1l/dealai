import { Metadata } from "next";
import { db } from "@/db";
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
import Link from "next/link";
import { platforms, platformsArr } from "@/db/enums";

type CaseStudyProps = Readonly<{
  params: { "project-id": string; "property-id": string };
}>;

export const metadata: Metadata = { title: "CaseStudy" };
export default async function CaseStudy({
  params: { "project-id": projectId, "property-id": propertyId },
}: CaseStudyProps) {
  const property = await db.property.findFirst({
    include: { posts: true, project: true },
    where: {
      id: propertyId,
    },
  });

  if (!property)
    return (
      <div className="container flex min-h-screen items-center justify-center py-6">
        <EmptyPlaceholder className="border-none">
          <EmptyPlaceholder.Icon name="empty" />
          <EmptyPlaceholder.Title>
            Oops, No Such Property.
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            you have not created you property yet. start working with us.
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
                {property?.["project"]?.["title"]}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{property?.["title"]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-4 flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {property?.["title"]}
          </h2>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </div>
      </div>
    </div>
  );
}
