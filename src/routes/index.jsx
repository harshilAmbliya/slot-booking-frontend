import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { route } from "./route.jsx";
import DashboardLayout from "@/layout/Dashboard.jsx";

export default function Router() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const ActualUserData = JSON.parse(user)
    const prepareRoutes = () => {

        let filterRoutes = [];
        route.forEach((route) => {
            if (route.permission === role || "user") {
                filterRoutes.push(route)
            }
        });
        return filterRoutes;
    };

    const routes = prepareRoutes();
    return (
        <>
            <Suspense fallback={<div className="flex justify-center items-center h-screen bg-white">Loading...</div>}>
                {role === 'user' ? <Routes>
                    {routes.map((route, index) => {
                        return route.ele ? (
                            <Route key={index} exact={true} path={route.path} element={token ? route.ele : <Navigate replace to={"/signin"} />} />
                        ) : (null)
                    })}
                    <Route path='*' element={<Navigate replace to={"/"} />} />
                </Routes> :
                    <DashboardLayout>
                        <Routes>
                            {routes.map((route, index) => {
                                return route.ele ? (
                                    <Route key={index} exact={true} path={route.path} element={token ? route.ele : <Navigate replace to={"/signin"} />} />
                                ) : (null)
                            })}
                            <Route path='*' element={<Navigate replace to={"/dashboard"} />} />
                        </Routes>
                    </DashboardLayout>}
            </Suspense>
        </>
    )

}
