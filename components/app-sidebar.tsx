"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarItemData } from "@/constants/constants";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SidebarItemData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarItemData.navMain} />
        <NavProjects projects={SidebarItemData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SidebarItemData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
