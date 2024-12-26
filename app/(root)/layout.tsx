import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Nunito } from "next/font/google";
// import TopBar from "@/components/common/TopBar";
// import Sidebar from "@/components/common/Sidebar";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

// import BreadCrum from "@/components/BreadCrum";
import AppTopbar from "@/components/app-topbar";
// import "@uploadthing/react/styles.css";

// ...

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human Resource management",
  description: "Human Resource Management",
};
export const iframeHeight = "800px";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${nunito.className}  antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className=" overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                  <div className="flex items-center gap-2 justify-between w-full">
                    <div className="flex items-center gap-2 px-3">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                    <AppTopbar />
                  </div>
                </header>
                <div className="px-5 overflow-hidden">{children}</div>
              </SidebarInset>
            </SidebarProvider>

            {/* <TopBar /> */}
            {/* <main className=" flex flex-row"> */}
            {/* <Sidebar /> */}
            {/* <div className=" overflow-hidden flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mt-10  md:ml-[10rem] ml-0">
                {children}
                '

              </div>
            </main> */}

            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
