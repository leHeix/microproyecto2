import { Navigate, Outlet } from "react-router";
import { useUser } from "./context/UserContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { authenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-700">
            Verificando autenticación...
          </h2>
          <p className="text-gray-500">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}
