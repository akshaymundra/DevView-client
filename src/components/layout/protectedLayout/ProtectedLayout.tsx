// import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/buttons/Button";
import Loading from "@/components/common/loading/Loading";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const ProtectedLayout = () => {

    const { user, loading } = useAuthContext();
    const location = useLocation();

    if (loading) return <Loading />

    if (!user) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }

    return (
        <div className="min-h-full flex flex-col relative">
            <Navbar />
            <div className="min-h-full flex mt-[48px]">
                <div className="sticky top-[48px] h-fit p-2 sm:p-4 border-r-2 border-gray-100">
                    <Sidebar />
                </div>
                <div className={`p-2 h-full sm:p-4 flex-1`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProtectedLayout