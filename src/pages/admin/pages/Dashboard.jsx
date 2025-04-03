import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar, Clock, Users } from "lucide-react"
import { DashboardChart } from "@/pages/admin/charts/DashboardCharts"
import { RecentActivity } from "@/pages/admin/components/RecentActivity"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getMyBookings } from "@/store/actions/bookTimeSlotAction"
import { getAllTimeSlots } from "@/store/actions/timeSlotAction"
import { getAllUsers } from "@/store/actions/userAction"

export default function DashboardPage() {
    const dispatch = useDispatch();
    const [totalNumbers, setTotalNumbers] = useState({
        totalUsers: 0,
        totalTimeSlots: 0,
        totalBookings: 0,
    })


    useEffect(() => {
        dispatch(getMyBookings()).then((res) => {
            setTotalNumbers({
                ...totalNumbers,
                totalBookings: res.payload?.data?.length || 0,
            })
        })
        dispatch(getAllTimeSlots()).then((res) => {
            setTotalNumbers({
                ...totalNumbers,
                totalTimeSlots: res.payload?.data?.length || 0,
            })
        })
        dispatch(getAllUsers()).then((res) => {
            setTotalNumbers({
                ...totalNumbers,
                totalUsers: res.payload?.data?.length || 0,
            })
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your booking system</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-[#64748b]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalNumbers.totalUsers}</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <span className="text-[#22c55e] flex items-center mr-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                12%
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
                        <Clock className="h-4 w-4 text-[#64748b]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalNumbers.totalTimeSlots}</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <span className="text-[#22c55e] flex items-center mr-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                8%
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-[#64748b]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalNumbers.totalBookings}</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <span className="text-[#22c55e] flex items-center mr-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                18%
                            </span>
                            from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
                        <Clock className="h-4 w-4 text-[#64748b]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <span className="text-[#ef4444] flex items-center mr-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                4%
                            </span>
                            less than yesterday
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="border-slate-200 shadow-sm md:col-span-2 lg:col-span-5">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Analytics Overview</CardTitle>
                        <Tabs defaultValue="weekly">
                            <TabsList className="grid w-[200px] grid-cols-3">
                                <TabsTrigger value="daily">Daily</TabsTrigger>
                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <DashboardChart />
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentActivity />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-[#64748b]" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">John Doe booked a slot</p>
                                        <p className="text-xs text-slate-500">
                                            {i === 1 ? "Just now" : i === 2 ? "2 hours ago" : i === 3 ? "Yesterday" : "2 days ago"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Popular Time Slots</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM", "4:30 PM - 5:30 PM", "11:00 AM - 12:00 PM"].map(
                                (slot, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-[#64748b]" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{slot}</p>
                                            <p className="text-xs text-slate-500">{90 - i * 15}% booked this week</p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>New Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {["Alice Smith", "Bob Johnson", "Carol Williams", "Dave Brown"].map((name, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden">
                                        <img
                                            src={`/placeholder.svg?height=36&width=36&text=${name.charAt(0)}`}
                                            alt={name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{name}</p>
                                        <p className="text-xs text-slate-500">
                                            Joined {i === 0 ? "today" : i === 1 ? "yesterday" : `${i + 1} days ago`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

