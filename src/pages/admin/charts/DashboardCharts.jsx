"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Mon", bookings: 12, slots: 24 },
    { name: "Tue", bookings: 18, slots: 24 },
    { name: "Wed", bookings: 15, slots: 24 },
    { name: "Thu", bookings: 22, slots: 24 },
    { name: "Fri", bookings: 20, slots: 24 },
    { name: "Sat", bookings: 14, slots: 18 },
    { name: "Sun", bookings: 8, slots: 12 },
]

export function DashboardChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSlots" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickFormatter={(value) => `${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip />
                <Area type="monotone" dataKey="slots" stroke="#64748b" fillOpacity={1} fill="url(#colorSlots)" />
                <Area type="monotone" dataKey="bookings" stroke="#2563eb" fillOpacity={1} fill="url(#colorBookings)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

