"use client";

import React from "react";
import { AppSidebar } from "components/theme";
import {
  SidebarProvider,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider

    >
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <header className="fixed top-0 flex items-center gap-2 border-b bg-transparent  p-4">
          <Breadcrumb >
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-foreground" href="/">RodoApp</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
