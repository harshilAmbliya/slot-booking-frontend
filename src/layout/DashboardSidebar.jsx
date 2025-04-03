import { useSidebar } from "@/layout/sidebar-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
    BarChart3,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Time Slots",
        href: "/dashboard/time-slots",
        icon: Clock,
    },
    {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Bookings",
        href: "/dashboard/bookings",
        icon: Calendar,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function DashboardSidebar() {
    const { pathname } = useLocation()
    const { isOpen, toggle } = useSidebar();

    const user = JSON.parse(localStorage.getItem("user")) || null;

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("auth_token");
        window.location.href = "/signin";
    }

    return (
        <div
            className={cn(
                "relative z-30 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300",
                isOpen ? "w-64" : "w-[70px]",
            )}
        >
            <div className="flex h-14 items-center border-b border-slate-200 px-3">
                <Link
                    to="/dashboard"
                    className={cn(
                        "flex items-center gap-2 font-semibold transition-all",
                        isOpen ? "justify-start" : "justify-center",
                    )}
                >
                    <BarChart3 className="h-6 w-6 text-[#2563eb]" />
                    {isOpen && <span className="text-lg">Admin Panel</span>}
                </Link>
                <Button variant="ghost" size="icon" className="absolute right-2 top-3 h-8 w-8" onClick={toggle}>
                    {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </div>
            <ScrollArea className="flex-1 py-2">
                <nav className="grid gap-1 px-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "group flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-slate-100",
                                pathname === link.href ? "bg-slate-100 text-[#2563eb]" : "text-slate-600 hover:text-slate-900",
                                !isOpen && "justify-center px-0",
                            )}
                        >
                            <link.icon
                                className={cn(
                                    "h-5 w-5 shrink-0",
                                    pathname === link.href ? "text-[#2563eb]" : "text-slate-400 group-hover:text-slate-500",
                                )}
                            />
                            {isOpen && <span className="ml-3">{link.title}</span>}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
            <div className="mt-auto border-t border-slate-200 p-4">
                <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
                    <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden">
                        {/* <img src="/images/admin.png" alt="Admin" className="h-full w-full object-cover" /> */}
                        {user?.name && (
                            <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-lg font-medium">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    {isOpen && (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user?.name}</span>
                            <span className="text-xs text-slate-500">{user?.email}</span>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    className={cn(
                        "mt-3 w-full justify-start text-slate-600 hover:text-slate-900",
                        !isOpen && "justify-center px-0",
                    )}
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isOpen && "Logout"}
                </Button>
            </div>
        </div>
    )
}

