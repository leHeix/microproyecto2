import { Outlet } from "react-router";
import { NavigationHeader } from "./NavigationHeader";

export default function AppLayout()
{
    return (
        <>
            <NavigationHeader />
            <Outlet />
        </>
    )
}