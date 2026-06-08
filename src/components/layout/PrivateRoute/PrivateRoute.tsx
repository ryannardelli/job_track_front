import { SpinnerLoading } from "@/components/ui/Loading/SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { state } = useAuth();
  const isAuthenticated = state.isAuthenticated;
  const loading = state.loading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <SpinnerLoading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}