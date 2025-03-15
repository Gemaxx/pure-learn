"use client";

import { useFetchData } from "@/lib/hooks/useFetchData";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import AddCategoryForm from "./AddCategoryForm";

export default function CategoriesList({
  learnerId,
  onCategoryAdded,
}: {
  learnerId: number;
  onCategoryAdded?: () => void;
}) {
  const {
    data: categories,
    loading,
    error,
    refetch,
  } = useFetchData<{ id: number; title: string; color: string }[]>(
    "categories",
    learnerId,
    {
      queryParams: { IsDeleted: false },
    }
  );

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <CollapsibleTrigger className="flex items-center gap-3 p-3 w-full">
              <span>All Categories</span>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>

          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* ✅ التعامل مع حالات التحميل والخطأ */}
                {loading && (
                  <p className="text-gray-400 p-3">Loading categories...</p>
                )}
                {error && (
                  <p className="text-red-500 p-3">Failed to load categories.</p>
                )}
                {!loading && !error && categories?.length! > 0
                  ? categories!.map((category) => (
                      <SidebarMenuItem key={category.id}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={`/categories/${category.id}`}
                            className="flex items-center gap-3"
                          >
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            {category.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  : !loading && (
                      <p className="text-gray-400 p-3">No categories found.</p>
                    )}

                {/* ✅ تمرير `onCategoryAdded` و `refetch` عند إضافة تصنيف جديد */}
                <AddCategoryForm
                  learnerId={learnerId}
                  onCategoryAdded={() => {
                    refetch();
                    onCategoryAdded?.();
                  }}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </ScrollArea>
  );
}
