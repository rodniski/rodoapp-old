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
import { BreadcrumbProvider, useBreadcrumbs } from "lib";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <div className="z-50">
          <AppSidebar />
        </div>
        <div className="flex flex-col w-full h-screen">
          <header className="fixed flex items-center gap-2 bg-background w-full justify-between p-4 z-50">
            <BreadcrumbDisplay />
          </header>
          <main className="w-full h-full">{children}</main>
        </div>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}

const BreadcrumbDisplay = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink className="text-foreground" href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
