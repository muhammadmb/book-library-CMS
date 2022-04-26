import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
    }, [isLoggedIn])

    return (
        isLoggedIn ?
            <Outlet />
            : <Navigate to="sign-in" state={{ from: location }} replace />
    );
}

export const RoleAuth = () => {
    const { roles } = useSelector((state) => state.auth);
    const location = useLocation();
    return (
        roles.includes("Master") ?
            <Outlet />
            : <Navigate to="user/information" state={{ from: location }} replace />
    )
}

export default RequireAuth;