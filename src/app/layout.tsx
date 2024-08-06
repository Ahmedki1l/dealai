import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { getAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/session-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: { template: " %s | Deal 360° AI", default: "Deal 360° AI" },
  description: "an AI system app",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getAuth();

  return (
    <html
      lang="en"
      className={cn("leading-relaxed tracking-tight", inter?.["className"])}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <TooltipProvider delayDuration={0} disableHoverableContent={true}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <div
            vaul-drawer-wrapper=""
            className="flex h-screen flex-col overflow-hidden bg-background"
          >
            <SessionProvider value={session}>{children}</SessionProvider>
          </div>

          <Toaster />
          <TailwindIndicator />
        </TooltipProvider>
      </body>
    </html>
  );
}
