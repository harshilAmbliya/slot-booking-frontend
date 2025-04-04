import { format } from 'date-fns';
import React, { createContext, useMemo, useState } from 'react'

export const BookingContext = createContext()

const BookingContextProvider = ({ children }) => {
    const [currentDateTimeSlots, setCurrentDateTimeSlots] = useState([]);

    const [date, setDate] = useState(new Date())
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [userBookings, setUserBookings] = useState([])
    const [activeTab, setActiveTab] = useState("book")
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedCancelBooking, setSelectedCancelBooking] = useState(null)

    // loadings
    const [availableTimeSlotsLoading, setAvailableTimeSlotsLoading] = useState(false)

    // Format the selected date to match our data format
    const formattedDate = useMemo(() => date ? format(date, "yyyy-MM-dd") : "", [date]);

    const value = {
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
        formattedDate,
        setAvailableTimeSlotsLoading,
    }
    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider