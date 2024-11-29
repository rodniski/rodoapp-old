import React from "react";
import { menuData } from "./menuData";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "ui";

export function SidebarMenuComponent() {
  return (
    <SidebarMenu>
      {menuData.navMain.map((item) => (
        <SidebarMenuItem key={item.title}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <div className="flex items-center">
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right">
              {item.items.map((subItem) => (
                <DropdownMenuItem key={subItem.title} asChild>
                  <a href={subItem.url}>{subItem.title}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
