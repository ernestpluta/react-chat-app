import { Route, Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export default function PrivateRoute(){
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to='/login'/>
}