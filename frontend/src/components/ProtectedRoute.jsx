import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;