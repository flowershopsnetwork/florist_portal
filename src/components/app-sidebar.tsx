import {
    Boxes,
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
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav.main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "./ui/sidebar";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const rolePermissions: Record<string, string[]> = {
    "Florist Representative": [
        "Dashboard", 
        "Florists",
        "Get Help",
        "Search"
    ],
    "Administrator": [
        "Dashboard",
        "Florists",
        "Products",
        "Collections",
        "Responses",
        "Towns",
        "Provinces",
        "Users",
        "Reports",
        "Settings",
        "Get Help",
        "Search"
    ],
};

const fullNav = [
    {
        label: "Main",
        items: [
            { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
            { title: "Florists", url: "/florists", icon: Store },
            { title: "Products", url: "/products", icon: Flower2 },
            { title: "Collections", url: "/collections", icon: Boxes },
            { title: "Responses", url: "#", icon: MessageCircle },
        ],
    },
    {
        label: "Inventory",
        items: [
            { title: "Towns", url: "/towns", icon: Building2 },
            { title: "Provinces", url: "/provinces", icon: BuildingIcon },
        ],
    },
    {
        label: "Management",
        items: [
            { title: "Users", url: "/users", icon: Users2 },
            { title: "Reports", url: "#", icon: ClipboardListIcon },
        ],
    },
    {
        label: "Support",
        items: [
            { title: "Settings", url: "/settings", icon: SettingsIcon },
            { title: "Get Help", url: "#", icon: HelpCircleIcon },
            { title: "Search", url: "#", icon: SearchIcon },
        ],
    },
];

function filterNavByRole(role?: string) {
    const allowed = role ? rolePermissions[role] ?? [] : [];

    return fullNav
        .map(group => ({
            ...group,
            items: group.items.filter(item => allowed.includes(item.title)),
        }))
        .filter(group => group.items.length > 0);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const context = useContext(AppContext);
    const user = context?.user;

    const filteredGroups = filterNavByRole(user?.role);

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
                <NavMain groups={filteredGroups} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
