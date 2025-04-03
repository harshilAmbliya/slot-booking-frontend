import { cn } from "@/lib/utils"

const activities = [
    {
        day: "Today",
        activities: [
            {
                id: 1,
                title: "New booking by John Doe",
                time: "10:30 AM",
            },
            {
                id: 2,
                title: "Time slot created for tomorrow",
                time: "09:15 AM",
            },
        ],
    },
    {
        day: "Yesterday",
        activities: [
            {
                id: 3,
                title: "New user registration",
                time: "03:45 PM",
            },
            {
                id: 4,
                title: "Booking cancelled",
                time: "11:20 AM",
            },
        ],
    },
]

export function RecentActivity() {
    return (
        <div className="space-y-6">
            {activities.map((group, groupIndex) => (
                <div key={group.day} className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-500">{group.day}</h4>
                    <div className="space-y-4">
                        {group.activities.map((activity, activityIndex) => (
                            <div key={activity.id} className="relative pl-6">
                                <div
                                    className={cn(
                                        "absolute left-0 top-1 h-3 w-3 rounded-full bg-[#2563eb]",
                                        activityIndex === group.activities.length - 1 && groupIndex === activities.length - 1
                                            ? ""
                                            : "before:absolute before:left-1.5 before:top-3 before:h-full before:w-px before:bg-slate-200",
                                    )}
                                />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                                    <p className="text-xs text-slate-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

