import { Calendar, Home, Inbox, Target, Settings } from "lucide-react"

import {
SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Book",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Prescriptions",
    url: "#",
    icon: Calendar,
  }
  
]

export function AppSidebar() {
  return (
    <Sidebar className=" text-white bg-blue-600">
        <SidebarHeader >
        <a  className="flex" href="#">
              <Target />
              <span></span>
            </a>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
      </SidebarContent>
      <SidebarFooter>
            <a className="flex" href="#">
              <Settings />
              <span></span>
            </a>
        </SidebarFooter>
    </Sidebar>
  )
}
