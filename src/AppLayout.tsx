import { Outlet } from "react-router";
import { NavigationHeader } from "./NavigationHeader";
import { NavigationFooter } from "./NavigationFooter";

export default function AppLayout()
{
    return (
        <>
            <NavigationHeader />
            <Outlet />
            <NavigationFooter />
        </>
    )
}