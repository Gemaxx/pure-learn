"use client";
import {
  Calendar,
  Home,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CategoriesList from "./catygoryList";
import { useLearner } from "@/lib/context/learnerContext";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },

  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const { learnerId } = useLearner();  
  // const categories = await getCategories(learnerId);
  return (
    <Sidebar>
      <SidebarHeader>PureLearn</SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          {/* <SidebarGroupLabel></SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* //&------------------------------------------- */}
        {/* We create a collapsible SidebarGroup for each parent. */}
        <CategoriesList learnerId={learnerId} />
      </SidebarContent>
    </Sidebar>
  );
}
