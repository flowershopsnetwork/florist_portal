import {
    Building2,
    BuildingIcon,
    ClipboardListIcon,
    Flower2,
    HelpCircleIcon,
    LayoutDashboardIcon,
    MessageCircle,
    SearchIcon,
    SettingsIcon,
    Store,
    Users2
} from "lucide-react"
import type * as React from "react"
import { Link } from "react-router-dom"
import { NavUser } from "./nav-user"
import { NavMain } from "./nav.main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

const data = {
    user: {
        name: "Administrator",
        // email: "dominic@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navGroups: [
        {
            label: "Main",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    icon: LayoutDashboardIcon,
                },
                {
                    title: "Florists",
                    url: "/florists",
                    icon: Store,
                },
                {
                    title: "Responses",
                    url: "#",
                    icon: MessageCircle,
                },
            ],
        },
        {
            label: "Inventory",
            items: [
                {
                    title: "Towns",
                    url: "/towns",
                    icon: Building2,
                },
                {
                    title: "Provinces",
                    url: "/provinces",
                    icon: BuildingIcon,
                },
                {
                    title: "Products",
                    url: "/products",
                    icon: Flower2,
                },
            ],
        },
        {
            label: "Management",
            items: [
                {
                    title: "Users",
                    url: "/users",
                    icon: Users2,
                },
                {
                    title: "Reports",
                    url: "#",
                    icon: ClipboardListIcon,
                },
            ],
        },
        {
            label: "Support",
            items: [
                {
                    title: "Settings",
                    url: "/settings",
                    icon: SettingsIcon,
                },
                {
                    title: "Get Help",
                    url: "#",
                    icon: HelpCircleIcon,
                },
                {
                    title: "Search",
                    url: "#",
                    icon: SearchIcon,
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link to="/">
                                <span className="text-base font-semibold">🌸 Florist Portal</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain groups={data.navGroups} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
