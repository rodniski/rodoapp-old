import {
  SidebarMenu,
  SidebarMenuItem,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "ui";
import { LogOut } from "lucide-react";
import { ThemeSwitcher } from "../theme-toggle";
import { useAtomValue } from "jotai";
import { usernameAtom } from "%/atoms/authStore";

export function NavUser() {
  const username = useAtomValue(usernameAtom);

  // Processa o nome e as iniciais
  const fullName = username
    ? username.replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Usuário";
  const initials = username
    ? username
        .split(".")
        .map((n) => n.charAt(0).toUpperCase())
        .join("")
    : "U";

  return (
    <SidebarMenu className="z-50">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              size={"icon"}
              className="p-1 rounded-full"
            >
              {initials}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="right" align="end">
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-2 px-3 py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/avatars/default.jpg" alt="User" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{fullName}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex my-3">
                <ThemeSwitcher />
              </div>
            </DropdownMenuGroup>
            <Button variant={"destructive"} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
