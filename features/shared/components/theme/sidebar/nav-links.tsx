import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "ui";
import { ChevronsUpDown } from "lucide-react";
import { menuData } from "./menuData";

export function NavLinks() {
  const [activeItem, setActiveItem] = React.useState(menuData.navMain[0]);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <DropdownMenu>
                  {/* Trigger do Dropdown */}
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      isActive={activeItem.title === item.title}
                      onClick={() => setActiveItem(item)}
                      className="w-full justify-between"
                    >
                      <div className="flex items-center">
                        <item.icon className="size-4" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  {/* Conteúdo do Dropdown */}
                  <DropdownMenuContent className="w-56" side="right" align="start">
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
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
