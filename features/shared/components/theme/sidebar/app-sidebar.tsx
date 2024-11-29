"use client";

import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  Separator,
} from "ui";
import Image from "next/image";
import { NavUser } from "./nav-user";
import { SidePages } from "./nav-sidepages";
import { NavLinks } from "./nav-links";

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="!w-[calc(var(--sidebar-width-icon)_+6px)] border-r bg-background h-screen "
    >
      {/* Header do Menu */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="p-2">
              <a href="/central" className="w-full h-full">
                <Image
                  src="/logo.png"
                  height={30}
                  width={30}
                  alt="logo"
                  className="size-6 aspect-square object-contain dark:invert"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
 
      <div className="flex flex-col justify-between h-full">
        <div className="h-full space-y-3 py-3">
          <NavLinks />
          <Separator />
          <SidePages />
        </div>
        {/* Footer do Menu */}
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
