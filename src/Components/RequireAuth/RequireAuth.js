import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();

    return (
        isLoggedIn ?
            <Outlet />
            : <Navigate to="sign-in" state={{ from: location }} replace />
    );
}

export default RequireAuth;