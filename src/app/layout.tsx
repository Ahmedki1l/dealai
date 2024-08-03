import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { getAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/session-provider"; 
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: { template: " %s | Deal AI", default: "Deal AI" },
  description: "an AI system app",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  return (
    <html lang="en" className={inter?.["className"]} suppressHydrationWarning>
      <body>
        <SessionProvider value={session}>{children}</SessionProvider>;
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
