import { API_CONFIG } from "@/api/apiConfig";
import { AppContext, AppContextType } from "@/context/AppContext";
import axios from "axios";
import {
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

export function NavUser() {
  const { user, setToken, setUser } = useContext(AppContext) as AppContextType;
  const { isMobile } = useSidebar()
  const [cookies, , removeCookie] = useCookies(["token"])
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(`${API_CONFIG.BASE_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
    } catch (error) {
      console.error("Logout request failed:", error)
    } finally {
      removeCookie("token", { path: "/" })
      setToken(undefined)
      setUser(null)
      navigate("/login")
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.username}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.role}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.role}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
