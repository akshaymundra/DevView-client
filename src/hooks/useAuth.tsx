import { HttpService } from '@/services';
import { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext({
    user: null,
    setUser: (user: any) => { user }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const http = new HttpService();
    const [user, setUser] = useState(null);

    // console.log(user);

    async function authenticate() {
        try {
            const response = await http.service().get<any>('/me');
            if (response.success) {
                setUser(response.user);
            }
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        authenticate();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(authContext);
}