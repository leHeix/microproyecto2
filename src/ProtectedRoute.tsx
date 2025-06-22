import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "./context/UserContext";

export default function ProtectedRoute()
{
    const authentication = useContext(UserContext);

    const { authenticated, loading } = authentication;

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    if(!authenticated)
    {
        return <Navigate to="/login" replace={true} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}