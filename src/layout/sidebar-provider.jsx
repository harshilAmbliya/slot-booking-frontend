import * as React from "react"

const SidebarContext = React.createContext(undefined)

export function SidebarProvider({
    children,
}) {
    const [isOpen, setIsOpen] = React.useState(true)

    const toggle = React.useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const close = React.useCallback(() => {
        setIsOpen(false)
    }, [])

    return <SidebarContext.Provider value={{ isOpen, toggle, close }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

