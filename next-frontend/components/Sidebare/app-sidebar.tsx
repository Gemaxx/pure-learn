import { getCategories } from "@/lib/api/categories";
import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  Plus,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import AddCategoryForm from "./AddCategoryForm";

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

export async function AppSidebar() {
  const learnerId = 3; // 🔹 اجعلها ديناميكية لاحقًا
  const categories = await getCategories(learnerId);
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

        <ScrollArea className="h-[calc(100vh-5rem)]">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              {/* 🔹 عنوان القائمة القابل للفتح والإغلاق (يظهر دائمًا) */}
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="flex items-center gap-3 p-3 w-full">
                  <span>All Categories</span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* 🔹 إذا كان هناك تصنيفات، يتم عرضها هنا */}
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SidebarMenuItem key={category.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/categories/${category.id}`}
                              className="flex items-center gap-3"
                            >
                              {/* 🔹 أيقونة دائرية بلون التصنيف */}
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              {category.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    ) : (
                      // 🔹 عند عدم وجود تصنيفات، يتم عرض هذه الرسالة
                      <p className="text-gray-400 p-3">No categories found.</p>
                    )}

                    {/* 🔹 زر إضافة تصنيف جديد متاح دائمًا */}
                    <AddCategoryForm learnerId={3} />
                  </SidebarMenu>
                </SidebarGroupContent>


                
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
