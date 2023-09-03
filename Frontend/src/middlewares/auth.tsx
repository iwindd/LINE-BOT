import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function AuthMiddleware() {
    const { isLogged, isLoadingUserData } = useAuthContext();
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (!isLoadingUserData) {
            setLoading(false);
        }
    }, [isLoadingUserData]);

    if (isLoading) {
        return <Outlet />;
    }

    return isLogged ? <Outlet /> : <Navigate to="/signin" />
}