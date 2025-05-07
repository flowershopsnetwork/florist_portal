import { API_CONFIG } from "@/api/apiConfig";
import { User } from "@/shared/interfaces/user.interface";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface AppContextType {
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [token, setToken] = useState<string | undefined>(cookies.token);
    const [user, setUser] = useState<User | null>(null); 

    useEffect(() => {
        setToken(cookies.token);
    }, [cookies.token]);

    async function getUser() {
        try {
            const res = await fetch(`${API_CONFIG.BASE_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data);
            } else {
                removeCookie('token', { path: '/' });
                setUser(null);
            }
        } catch {
            removeCookie('token', { path: '/' });
            setUser(null);
        }
    }

    useEffect(() => {
        if (cookies.token) {
            getUser();
        } else {
            setUser(null);
        }
    }, [cookies.token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
