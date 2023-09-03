import React, { useEffect } from 'react';
import { QueryFunction, UseMutateFunction, useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import axios from '../components/Axios';

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
    isLogged: boolean,
    isLoadingUserData: boolean,
    methods: {
        Register: UseMutateFunction<AxiosResponse<any, any>, unknown, User, unknown>,
        Login: UseMutateFunction<AxiosResponse<any, any>, unknown, { email : string, password: string}, unknown>,
        Logout: UseMutateFunction<void, unknown, void, unknown>
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = React.useState<Auth | null>(null);
    const [isLogged, setLogin] = React.useState<boolean>(false);
    
    const { refetch, data, isLoading : isLoadingUserData } = useQuery("LoadUserData", async () => {
        return await axios.get("/auth/user")
    }, {retry: 0})

    const { mutate: Register, isLoading: isRegister } = useMutation(async ({ email, username, password }: User) => {
        return await axios.put("/auth/register", { email, username, password })
    })

    const { mutate: Login, data : LoginData, isLoading: isLogin } = useMutation(async ({ email, password }: { email : string, password: string}) => {
        return await axios.post("/auth/login", { email, password })
    })

    const { mutate: Logout, isLoading: isLogout } = useMutation(async () => {
        return await axios.get("/auth/logout").then(() => {
            setAuth(null);
            setLogin(false);
        })
    })

    useEffect(() => {
        if (LoginData?.status == 200) {
            refetch()
        }
    }, [LoginData])

    useEffect(() => {
        if (data?.data) {
            const { email, username, _id } = data.data as Auth
            setAuth({ email, username, _id })
            setLogin(true)
        }else{
            setAuth(null)
            setLogin(false)
        }
    }, [data])

    return (
        <AuthContext.Provider
            value={{
                auth,
                refetch,
                isLogged,
                isLoadingUserData,
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