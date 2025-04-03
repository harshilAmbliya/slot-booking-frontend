import { lazy } from "react";

const BookSlot = lazy(() => import("@/pages/slots/BookSlot"));

export const route = [
   {
      path: "/",
      element: <BookSlot />,
      permission: "user"
   }
]