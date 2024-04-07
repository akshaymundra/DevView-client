import { authContext } from "@/context/AuthContext";
import { useContext } from "react";


export const useAuthContext = () => {
    const context = useContext(authContext);


    if (!context) {
        throw new Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context;

}