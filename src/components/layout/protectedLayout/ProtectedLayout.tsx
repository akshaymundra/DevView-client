import { useAuth } from "@/hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedLayout = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
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