import * as React from "react";
import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "PureLearn",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased font-sans">
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 relative bg-background">
              <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/ px-4 backdrop-blur">
                <div className="Logo flex flex-row gap-2">
                  <Image
                    src="/purelearn-logo-white-forground.svg"
                    alt="PureLearn"
                    width="12"
                    height="12"
                    className="brightness-0 invert"
                  />
                  <span className="font-semibold text-sm tracking-tight text-foreground/80  ">
                    PureLearn
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <header>
                  <h1 className="text-sm font-medium text-muted-foreground">
                    Time Management
                  </h1>
                </header>
              </div>
              <div className="p-6">{children}</div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
