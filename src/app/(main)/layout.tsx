import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function MainLayout({ children }: MainLayoutProps) {
  const { user } = await getAuth();
  if (!user) redirect("/login");

  return <div className="flex min-h-screen flex-col">{children}</div>;
}
