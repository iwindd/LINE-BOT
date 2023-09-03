import { Outlet, Navigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function GuestMiddleware(){
    const {isLogged} = useAuthContext();

    return !isLogged ? <Outlet/> : <Navigate to="/"/>
}