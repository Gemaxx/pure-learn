//app/page.tsx
import  AppSidebar  from "@/components/Sidebare/AppSidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Layout from "./layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ResourceTypeForm } from "@/components/LearningResource/resourceTypeForm";
import ResourceCards from "@/components/LearningResource/ResoursesCards";


export default function Home() {
  return (
    <>
      <div className=" bg-gray-100 ">home</div>
      
      <ResourceCards />
      {/* <ThemeToggle /> */}
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>help</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      {/* <TaskPage/> */}
    </>
  );
}
