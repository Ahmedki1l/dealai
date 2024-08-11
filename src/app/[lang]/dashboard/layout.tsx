import { cookies } from "next/headers";
import { DashboardLayout as DashboardLayoutComponent } from "@/components/dashboard-layout";
import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LocaleProps } from "@/types/locale";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
  params: LocaleProps;
}>;

export default async function DashboardLayout({
  children,
  params: { lang },
}: DashboardLayoutProps) {
  const { user } = await getAuth();
  if (!user) redirect(`/${lang}/login`);

  // collapsing properties
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <DashboardLayoutComponent
      user={user}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
      links={{
        top: [
          [
            {
              value: "/dashboard",
              segment: null,
              label: "Dashboard",
              indicator: "128",
              icon: "home",
            },
            {
              value: "/dashboard/projects",
              segment: "projects",
              label: "My Projects",
              indicator: "128",
              icon: "analytics",
            },
          ],
        ],
        bottom: [
          [
            {
              value: "/dashboard/settings",
              segment: "settings",
              label: "Settings",
              // indicator: "10",
              icon: "settings",
            },
          ],
        ],
      }}
    >
      {children}
    </DashboardLayoutComponent>
  );
}
