import { lazy } from "react";

const BookSlot = lazy(() => import("@/pages/slots/BookSlot"));
const AdminUser = lazy(() => import("@/pages/admin/AdminUser"));

export const route = [
   {
      path: "/",
      element: <BookSlot />,
      permission: "user"
   },
   {
      path: "/dashboard",
      element: <AdminUser />,
      permission: "admin"
   }
]