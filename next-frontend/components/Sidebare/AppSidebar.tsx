"use client"
import { Home, Search, Settings, Calendar } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import CategoriesList from "./catygoryList"
import { useLearner } from "@/lib/context/learnerContext"
import { usePathname } from "next/navigation"

// Updated menu items to include Calendar
const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
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
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  }
]

export default function AppSidebar() {
  const { learnerId } = useLearner()
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>PureLearn</SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* All menu items including Calendar */}
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={pathname === item.url ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <CategoriesList learnerId={learnerId ?? 0} />
      </SidebarContent>
    </Sidebar>
  )
}