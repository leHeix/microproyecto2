import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { Login } from "./screens/Login"
import { Perfil } from "./screens/Perfil";
import { supabase } from "./supabase";
import AppLayout from "./AppLayout";
import ProtectedRoute from "./ProtectedRoute";

const App = (): JSX.Element => {
	useEffect(() => {
		const getSession = async() => {
			await supabase.auth.getSession();
		}
		getSession();
	}, []);

	const router = createBrowserRouter([
		{
			element: <AppLayout />,
			children: [
				{
					element: <ProtectedRoute />,
					children: [
						{
							path: "/profile",
							element: <Perfil />
						}
					]
				},
				{
					path: "/*",
					element: <LandingPage />,
				},
				{
					path: "/login",
					element: <Login />
				},
			]
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default App
