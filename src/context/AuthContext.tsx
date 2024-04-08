import { removeAuthToken } from "@/lib/utils";
import { HttpService } from "@/services";
import { createContext, useReducer, Dispatch, useEffect } from "react";
// import { useLocation } from "react-router-dom";


type ActionType = {
    type: string;
    payload?: any;
};

type AuthStateType = {
    user: null | any;
    loading: boolean;
    dispatch: Dispatch<ActionType>;
}

export const authContext = createContext<AuthStateType>({
    user: null,
    loading: false,
    dispatch: () => { }
});

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LODING':
            return { ...state, loading: true };
        case 'LOGIN':
            return { user: action.payload, loading: false };
        case 'LOGOUT':
            removeAuthToken();
            return { user: null, loading: false };
        default:
            return state;
    }
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const http = new HttpService();
    // const location = useLocation();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        loading: false,
    });

    // console.log("🚀 ~ state:", state)
    useEffect(() => {
        dispatch({ type: 'LODING' });
        ; (async () => {
            try {
                const response = await http.service().get<any>('/me');
                if (response.success) {
                    dispatch({ type: 'LOGIN', payload: response.user });
                } else {
                    dispatch({ type: 'LOGOUT' });
                }
            } catch (error) {
                dispatch({ type: 'LOGOUT' });
                // console.log(error)
            }
        })();
    }, [])

    return (
        <authContext.Provider value={{ ...state, dispatch }}>
            {children}
        </authContext.Provider>
    )
}
