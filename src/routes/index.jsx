import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { route } from "./route.jsx";
import DashboardLayout from "@/layout/Dashboard.jsx";
import DashboardUserLayout from "@/layout/DashboardUser.jsx";
import { Loader2 } from "lucide-react";

export default function Router() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const ActualUserData = JSON.parse(user)
    const prepareRoutes = () => {

        let filterRoutes = [];
        route.forEach((route) => {
            if (route.permission === role) {
                filterRoutes.push(route)
            }
        });
        return filterRoutes;
    };

    const routes = prepareRoutes();
    return (
        <>
            <Suspense fallback={<div className="flex justify-center items-center h-screen bg-white">
                <Loader2 className="h-7 w-7 animate-spin" />
            </div>}>
                {role === 'user' ? <DashboardUserLayout>
                    <Routes>
                        {routes.map((route, index) => {
                            console.log(route.element, "route")
                            return route.element ? (
                                <Route key={index} exact={true} path={route.path} element={token ? route.element : <Navigate replace to={"/signin"} />} />
                            ) : (null)
                        })}
                        <Route path='*' element={<Navigate replace to={"/"} />} />
                    </Routes> </DashboardUserLayout> :
                    <DashboardLayout>
                        <Routes>
                            {routes.map((route, index) => {
                                return route.element ? (
                                    <Route key={index} exact={true} path={route.path} element={token ? route.element : <Navigate replace to={"/signin"} />} />
                                ) : (null)
                            })}
                            <Route path='*' element={<Navigate replace to={"/dashboard"} />} />
                        </Routes>
                    </DashboardLayout>}
            </Suspense>
        </>
    )

}
