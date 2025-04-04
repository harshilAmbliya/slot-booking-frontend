import React, { useContext } from 'react'
import { useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, Loader2, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDispatch } from "react-redux"
import { getAllUsers } from "@/store/actions/userAction"
import { getAllTimeSlots, getCurrentDateTimeSlots } from "@/store/actions/timeSlotAction"
import { bookTimeSlot, cancelBooking, getMyBookings } from "@/store/actions/bookTimeSlotAction"
import { logout } from "@/store/actions/auth/logout"
import { useNavigate } from 'react-router-dom'
import { BookingContext } from '@/context/bookingContext'

const Bookings = () => {


    const dispatch = useDispatch();

    const navigate = useNavigate()
    const {
        currentDateTimeSlots,
        setCurrentDateTimeSlots,
        date,
        setDate,
        selectedSlot,
        setSelectedSlot,
        userBookings,
        setUserBookings,
        activeTab,
        setActiveTab,
        isModelOpen,
        setIsModelOpen,
        selectedCancelBooking,
        setSelectedCancelBooking,
        availableTimeSlotsLoading,
        setAvailableTimeSlotsLoading,
        formattedDate,
    } = useContext(BookingContext)

    useEffect(() => {
        //   if (activeTab === "manage") {
        dispatch(getMyBookings()).then((res) => {
            if (res.payload) {
                setUserBookings(res.payload?.data);
            }
        });
        //   }
    }, [dispatch, activeTab]);


    useEffect(() => {
        dispatch(getAllTimeSlots());

    }, [dispatch]);

    useEffect(() => {
        dispatch(getCurrentDateTimeSlots({ date: formattedDate, setLoading: setAvailableTimeSlotsLoading })).then((res) => {
            if (res.payload?.data?.slots?.length > 0) {
                setCurrentDateTimeSlots(res.payload?.data?.slots);
            }
        });
    }, [formattedDate, activeTab]);


    // Filter time slots for the selected date
    const timeSlotsForDate = currentDateTimeSlots.filter((slot) => {
        return slot.date === formattedDate
    })

    console.log(availableTimeSlotsLoading)

    // Handle booking a time slot
    const handleBookTimeSlot = () => {
        if (!selectedSlot) return
        dispatch(bookTimeSlot({ timeSlotId: selectedSlot })).then((res) => {
            setActiveTab("manage")
            if (res.payload) {
                dispatch(getCurrentDateTimeSlots({ date: formattedDate, setLoading: setAvailableTimeSlotsLoading })).then((res) => {
                    if (res.payload?.data?.slots?.length > 0) {
                        setCurrentDateTimeSlots(res.payload?.data?.slots);
                    }
                });
            }
        })


        // Reset form
        setSelectedSlot(null)

        // In a real app, you would send this data to your Ruby on Rails backend
        // alert(`Booking confirmed for ${slot.date} at ${slot.time}`)
    }

    // Handle canceling a booking
    const handleCancelBooking = (bookingId) => {
        dispatch(cancelBooking(bookingId)).then((res) => {
            if (res.payload?.status === 200) {
                dispatch(getMyBookings()).then((res) => {
                    if (res.payload) {
                        setUserBookings(res.payload?.data);
                        setIsModelOpen(false)
                    }
                });
            }
        })

    }

    const handleTabChange = (value) => {
        if (value === "book") {
            setActiveTab("book")
        } else {
            setActiveTab("manage")
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>View and manage your current bookings</CardDescription>
                </CardHeader>
                <CardContent>
                    {userBookings.length > 0 ? (
                        <div className="space-y-4">
                            {userBookings.map((booking) => (
                                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-md">
                                    <div>
                                        <p className="font-medium">
                                            {booking?.time_slot?.date} at {booking?.time_slot?.formatted_time}
                                        </p>
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => {
                                        setIsModelOpen(true)
                                        setSelectedCancelBooking(booking)
                                    }}>
                                        Cancel Booking
                                    </Button>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center border rounded-md bg-gray-50">
                            <p className="mb-2 text-lg font-medium">No bookings found</p>
                            <p className="mb-4 text-gray-500">You haven't booked any time slots yet.</p>
                            <Button className={'cursor-pointer'} onClick={() => navigate("/")}>
                                Book a Time Slot
                            </Button>
                        </div>
                    )}
                    <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cancel Booking</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to cancel your booking for {selectedCancelBooking?.time_slot?.date} at {selectedCancelBooking?.time_slot?.formatted_time}? This
                                    will free up the time slot for other users.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => {
                                    setIsModelOpen(false)
                                    setActiveTab("book")
                                }} className={'cursor-pointer'}>Keep Booking</Button>
                                <Button variant="destructive" onClick={() => handleCancelBooking(selectedCancelBooking.id)} className={'cursor-pointer'}>
                                    Yes, Cancel Booking
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    )
}

export default Bookings