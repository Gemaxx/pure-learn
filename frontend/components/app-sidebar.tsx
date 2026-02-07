"use client";

import * as React from "react";
import Image from "next/image";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Plus,
  ChevronDown,
  ListTodo,
  Timer,
  History,
  BarChart2,
  PlayCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-border/50"
    >
      <SidebarHeader className="h-14 border-b border-border/40 item-center justify-center">
        <SidebarTrigger />

      </SidebarHeader>

      <SidebarContent className="px-2 pt-4">
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center gap-2 py-1.5 px-2 hover:bg-accent/50 rounded-md transition-all outline-none cursor-pointer">
                <LayoutDashboard className="size-4 text-muted-foreground" />
                {!isCollapsed && (
                  <>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Goals
                    </span>
                    <ChevronDown className="ml-auto size-3.5 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                  </>
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              {!isCollapsed && (
                <SidebarGroupContent className="mt-1 ml-4 border-l border-border/60 pl-2">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" className="h-9">
                        <ListTodo className="size-4 text-zinc-500" />
                        <span className="text-sm">Current Goals</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        size="sm"
                        className="h-9 text-primary hover:text-primary"
                      >
                        <Plus className="size-4" />
                        <span className="text-sm font-medium">New Goal</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible mt-4">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center gap-2 py-1.5 px-2 hover:bg-accent/50 rounded-md transition-all outline-none cursor-pointer">
                <Timer className="size-4 text-muted-foreground" />
                {!isCollapsed && (
                  <>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Time Management
                    </span>
                    <ChevronDown className="ml-auto size-3.5 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                  </>
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              {!isCollapsed && (
                <SidebarGroupContent className="mt-1 ml-4 border-l border-border/60 pl-2">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" className="h-9 relative">
                        <PlayCircle className="size-4 text-orange-500" />
                        <span className="text-sm font-medium">
                          Focus Sessions
                        </span>
                        <span className="absolute right-2 flex h-2 w-2"></span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" className="h-9">
                        <BarChart2 className="size-4 text-blue-500" />
                        <span className="text-sm">Statistics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" className="h-9">
                        <History className="size-4 text-zinc-400" />
                        <span className="text-sm">History</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="sm" className="h-9">
                        <Settings className="size-4 text-zinc-400" />
                        <span className="text-sm">Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-accent/50 transition-colors h-12"
            >
              <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
                <Image
                  src="/profile pic.jpg"
                  alt="PureLearn Profile"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-sm font-semibold leading-none">
                    Gemax
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none tracking-tight">
                    Focusing Since Jan
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
