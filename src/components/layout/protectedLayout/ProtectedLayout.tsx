// import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/common/loading/Loading";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {

    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) return <Loading />

    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    return (
        <div className="min-h-screen text-center">
            <div className="">
                nav bar will be here
            </div>
            <Outlet />
        </div>
    )
}

export default ProtectedLayout