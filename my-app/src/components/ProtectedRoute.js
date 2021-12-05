import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/firebase";
import Login from "../pages/ForgotPassword";
export default function ProtectedRoute({redirectTo, comp}){
    const { currentUser } = useAuth();
    return auth.currentUser ? <Outlet /> : <Navigate to={redirectTo} element={comp}/>
}