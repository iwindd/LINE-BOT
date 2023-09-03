import React, { useEffect } from 'react';
import { QueryFunction, UseMutateFunction, useMutation, useQuery } from 'react-query';
import axios from '../components/Axios';
import { AxiosResponse } from 'axios';

const AuthContext = React.createContext<AuthContext | null>(null);

interface Auth extends User {
    _id: string
}

interface User {
    email: string,
    username: string,
    password?: string
}

interface AuthContext {
    auth: Auth | null,
    refetch: QueryFunction,
    isLoading: boolean,
    methods: {
        Register: UseMutateFunction<AxiosResponse<any, any>, unknown, User, unknown>,
        Login: UseMutateFunction<AxiosResponse<any, any>, unknown, { email : string, password: string}, unknown>,
        Logout: UseMutateFunction<AxiosResponse<any, any>, unknown, void, unknown>
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = React.useState<Auth | null>(null);
    const { refetch, data } = useQuery("LoadUserData", async () => {
        return await axios.get("/auth/user")
    })

    const { mutate: Register, isLoading: isRegister } = useMutation(async ({ email, username, password }: User) => {
        return await axios.put("/auth/register", { email, username, password })
    })

    const { mutate: Login, isLoading: isLogin } = useMutation(async ({ email, password }: { email : string, password: string}) => {
        return await axios.post("/auth/login", { email, password })
    })

    const { mutate: Logout, isLoading: isLogout } = useMutation(async () => {
        return await axios.get("/auth/logout")
    })

    useEffect(() => {
        if (data?.data) {
            const { email, username, _id } = data.data as Auth
            setAuth({ email, username, _id })
        }
    }, [data])

    return (
        <AuthContext.Provider
            value={{
                auth,
                refetch,
                isLoading: isRegister || isLogin || isLogout,
                methods: { Register, Login, Logout }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuthContext(): AuthContext  {
    const context = React.useContext(AuthContext);
    if (!context) throw new Error("ERROR CONTEXT");

    return context
}