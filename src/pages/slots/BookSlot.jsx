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

const BookSlot = () => {
  const [currentDateTimeSlots, setCurrentDateTimeSlots] = useState([]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (activeTab === "manage") {
      dispatch(getMyBookings()).then((res) => {
        if (res.payload) {
          setUserBookings(res.payload?.data);
        }
      });
    }
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
      <div className="header-container flex justify-between items-center bg-gray-100 p-4 px-10 sticky top-0 z-10 filter backdrop-blur-sm">
        <h1 className="text-3xl font-bold"><Timer className="w-8 h-8" /> </h1>
        <Button variant="outline" className={'cursor-pointer'} onClick={() => dispatch(logout())}>Logout</Button>
      </div>
      <div>
        <div className="container max-w-6xl px-4 py-8 mx-auto min-h-screen flex justify-center items-center">
          <div className="w-full">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Time Slot Booking System</h1>
              <p className="mt-2 text-gray-500">Book available time slots or manage your existing bookings</p>
            </header>

            <Tabs value={activeTab} defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="book">Book a Time Slot</TabsTrigger>
                <TabsTrigger value="manage">My Bookings</TabsTrigger>
              </TabsList>

              <TabsContent value="book" className="space-y-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select a Date</CardTitle>
                      <CardDescription>Choose a date to see available time slots</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          />
                        </PopoverContent>

                      </Popover>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Available Time Slots</CardTitle>
                      <CardDescription>
                        Select an available time slot for {date ? format(date, "PPP") : "the selected date"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {availableTimeSlotsLoading ? <div className="flex justify-center items-center h-[150px]">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div> : timeSlotsForDate.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {timeSlotsForDate.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={slot.booked ? "outline" : selectedSlot === slot.id ? "default" : "outline"}
                              className={cn(
                                "h-20",
                                slot.booked ? "opacity-50 cursor-not-allowed disabled:pointer-events-auto py-1" : "cursor-pointer py-1",
                                selectedSlot === slot.id ? "border-2 border-primary bg-primary cursor-pointer text-primary-foreground py-1" : "",
                              )}
                              disabled={slot.booked}
                              onClick={() => setSelectedSlot(slot.id)}
                            >
                              <div className="flex flex-col items-center">
                                <Clock className="w-4 h-4 mb-1" />
                                <span>{slot.formatted_time}</span>
                                <span className="text-xs mt-0.5">{slot.booked ? "Booked" : "Available"}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center border rounded-md bg-gray-50">
                          <p>No time slots available for this date.</p>
                          <p className="text-sm text-gray-500">Please select another date.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {selectedSlot && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Complete Your Booking</CardTitle>
                      <CardDescription>Fill in your details to book the selected time slot</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 mb-4 border rounded-md bg-gray-50">
                        <p className="font-medium">Selected Time Slot:</p>
                        <p>
                          {date ? format(date, "PPP") : ""} at {currentDateTimeSlots.find((s) => s.id === selectedSlot)?.formatted_time}
                        </p>
                      </div>

                      {/* <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div> */}

                      {/* <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div> */}

                      {/* <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div> */}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                        Cancel
                      </Button>
                      <Button className={`cursor-pointer`} onClick={handleBookTimeSlot} >
                        Confirm Booking
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="manage">
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
                        <Button className={'cursor-pointer'} onClick={() => setActiveTab("book")}>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookSlot