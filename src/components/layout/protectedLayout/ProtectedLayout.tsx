// import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/buttons/Button";
import Loading from "@/components/common/loading/Loading";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {

    const { user, loading, dispatch } = useAuthContext();
    const location = useLocation();

    if (loading) return <Loading />

    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    return (
        <div className="min-h-screen text-center">
            <div className="mb-5">
                <Button
                    varient="primary"
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                >
                    Logout
                </Button>
            </div>
            <Outlet />
        </div>
    )
}

export default ProtectedLayout