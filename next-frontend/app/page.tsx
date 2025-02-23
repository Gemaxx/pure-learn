import { AppSidebar } from "@/components/app-sidebar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Layout from "./layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Label } from "@/components/ui/label";


export default function Home() {
  return (
    <Layout>
      <AppSidebar />
      <ThemeToggle />
      <Label htmlFor="email">Hi Amal, ✨.</Label>
    

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>help</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Layout>
  );
}
