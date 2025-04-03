import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { route } from "./route.jsx";

export default function Router() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem("user");
    const ActualUserData = JSON.parse(user)
    const prepareRoutes = () => {

        let filterRoutes = [];
        route.forEach((route) => {
            if (route.permission === ActualUserData?.role || "user") {
                filterRoutes.push(route)
            }
        });
        return filterRoutes;
    };

    const routes = prepareRoutes();
    return (
        <>
            <Suspense fallback={<div className="flex justify-center items-center h-screen bg-white">Loading...</div>}>
                {(ActualUserData?.role || "user") === 'user' ? <Routes>
                    {routes.map((route, index) => {
                        return route.ele ? (
                            <Route key={index} exact={true} path={route.path} element={token ? route.ele : <Navigate replace to={"/signin"} />} />
                        ) : (null)
                    })}
                    <Route path='*' element={<Navigate replace to={"/"} />} />
                </Routes> :
                    <Routes>
                        {routes.map((route, index) => {
                            return route.ele ? (
                                <Route key={index} exact={true} path={route.path} element={token ? route.ele : <Navigate replace to={"/signin"} />} />
                            ) : (null)
                        })}
                        <Route path='*' element={<Navigate replace to={"/admin"} />} />
                    </Routes>}
            </Suspense>
        </>
    )

}
