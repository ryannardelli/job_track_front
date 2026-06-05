import { SpinnerLoading } from "@/components/ui/Loading/SpinnerLoading";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = true;
  const loading = false;

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