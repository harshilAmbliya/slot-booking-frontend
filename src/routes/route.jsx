import BookingContextProvider from "@/context/bookingContext";
import Bookings from "@/pages/bookings";
import { lazy } from "react";

const BookSlot = lazy(() => import("@/pages/slots/BookSlot"));
const AdminUser = lazy(() => import("@/pages/admin/AdminUser"));

export const route = [
   {
      path: "/",
      element: <BookingContextProvider><BookSlot /></BookingContextProvider>,
      permission: "user"
   },
   {
      path: "/bookings",
      element: <BookingContextProvider><Bookings /></BookingContextProvider>,
      permission: "user"
   },
   {
      path: "/dashboard",
      element: <AdminUser />,
      permission: "admin"
   }
]