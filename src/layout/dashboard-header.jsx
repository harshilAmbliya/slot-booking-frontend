
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Search } from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
    const [notifications] = useState([
        { id: 1, message: "New booking by John Doe", time: "5 minutes ago" },
        { id: 2, message: "Time slot created for tomorrow", time: "1 hour ago" },
        { id: 3, message: "New user registration", time: "Yesterday" },
    ])

    const user = JSON.parse(localStorage.getItem("user")) || null;


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("auth_token");
        window.location.href = "/signin";
    }

    return (
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
            <div className="hidden md:block md:w-64 lg:w-72">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-md border border-slate-200 bg-white pl-8 text-sm shadow-none"
                    />
                </div>
            </div>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Search">
                <Search className="h-4 w-4" />
            </Button>
            <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
                            <Bell className="h-4 w-4" />
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-medium text-white">
                                {notifications.length}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                                <span>{notification.message}</span>
                                <span className="text-xs text-slate-500">{notification.time}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center font-medium">View all notifications</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2" aria-label="User menu">
                            <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden">
                                {user?.name && (
                                    <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-lg font-medium">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <span className="hidden md:inline-flex">Admin User</span>
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuItem className={'cursor-pointer'} onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

