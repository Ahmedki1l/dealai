import { DataTable } from "@/components/data-table";
import { ProjectCreateButton } from "@/components/project-create-button";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { getAuth } from "@/lib/auth";
import type { Metadata } from "next";
import { columns } from "./projects/columns";
import { db } from "@/lib/db";

type DashboardProps = Readonly<{}>;

export const metadata: Metadata = { title: "Dashboard" };
export default async function Dashboard({}: DashboardProps) {
  const user = (await getAuth())?.["user"]!;
  const projects = await db.project.findMany({
    where: {
      userId: user?.["id"],
    },
  });

  return (
    <div className="container flex-1 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
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

      <div className="mx-auto mt-10 flex flex-col gap-10">
        <section>
          <div className="flex justify-around gap-4 [&>div]:w-fit [&>div]:rounded-lg [&>div]:bg-white">
            <div className="">
              <img src="/images/DailyProgress.png" alt="" />
            </div>
            <div>
              <img src="/images/Charts.png" alt="" />
            </div>
            <div>
              <img src="/images/shutterstock_502875937.png" alt="" />
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <CardTitle>Latest Projects</CardTitle>
          <DataTable data={projects} columns={columns as any} />
        </div>
      </div>
    </div>
  );
}
