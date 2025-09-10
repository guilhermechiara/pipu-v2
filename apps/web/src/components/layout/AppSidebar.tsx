"use client";

import * as React from "react";
import { ChevronLeft, Command, Dog, Hamburger, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@pipu/ui/components";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  open?: boolean;
}

export function AppSidebar({ open, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) !h-(calc(100svh-var(--header-height)))"
      {...props}
    >
      <SidebarHeader className="mt-4">
        {!open && <SidebarTrigger icon={<Menu />} />}
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-row items-center gap-4">
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
              {open && <SidebarTrigger icon={<ChevronLeft />} />}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/cycles">
                    <Dog />
                    <span>Testing a dog</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
