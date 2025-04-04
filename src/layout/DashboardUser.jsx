import React from "react"
import { DashboardHeader } from "@/layout/DashboardUserHeader"
import { DashboardSidebar } from "@/layout/DashboardUserSidebar"
import { SidebarProvider } from "@/layout/sidebar-provider"

export default function DashboardUserLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
                <DashboardSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <DashboardHeader />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}

