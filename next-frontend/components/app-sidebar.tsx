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
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

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


type Category = {
  id: number;
  title: string;
  color: string;
};

// ✅ Fetch categories from API
async function getCategories(learnerId: number): Promise<Category[]> {
  try {
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/categories`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
export async function AppSidebar() {
  const learnerId = 1; // 🔹 اجعلها ديناميكية لاحقًا
  const categories = await getCategories(learnerId);
  return (
    <Sidebar>
      <SidebarHeader>PureLearn</SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>label</SidebarGroupLabel>
          {/* //& + Add New Category */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><Plus/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> Add New Category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input
                    id="name"
                    placeholder="Category Name"
                    className="col-span-3"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">color</Label>
                  <Input
                    id="color"
                    value="#000000"
                    className="col-span-3 w-12"
                    type="color"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Description</Label>
                  <textarea
                    id="description"
                    placeholder="You can write a description here"
                    className="col-span-3 border border-gray-300 rounded-md p-2"
                    rows={4}
                    cols={50}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          {categories.length > 0 ? (
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroup>
                {/* 🔹 عنوان القائمة القابل للفتح والإغلاق */}
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger className="flex items-center gap-3 p-3 w-full">
                    <span>All Categories</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                {/* 🔹 عند الفتح، يتم عرض جميع التصنيفات داخل القائمة */}
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {categories.map((category) => (
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
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <p className="text-gray-400">No categories found.</p>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
