"use client";

import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "ui";
import { Inbox, LogOut } from "lucide-react";
import { menuData } from "./menuData"; // Dados do menu

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState(menuData.navMain[0]);

  return (
    <Sidebar
      collapsible="none"
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r bg-sidebar"
    >
      {/* Header do Menu */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Inbox className="size-4" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navegação Principal */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuData.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    isActive={activeItem.title === item.title}
                    onClick={() => setActiveItem(item)}
                  >
                    <item.icon className="size-4" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer do Menu */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="icon">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/avatars/default.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-2 px-3 py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/default.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">User Name</p>
                  <p className="text-xs text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
