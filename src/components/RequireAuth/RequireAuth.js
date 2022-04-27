import { useContext } from "react"
import { UserContext } from "../../providers/UserProvider"
import { Outlet,Navigate,useLocation } from "react-router-dom"

const RequireAuth = ({ allowedRoles }) => {
    const { user } = useContext(UserContext)
    const location = useLocation();

    return (
        // user?.role?.find(role => allowedRoles?.includes(role))
        allowedRoles?.includes(user?.role)
            ? <Outlet />
            : user?.userName
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/noPermission" state={{ from: location }} replace />
    );
}

export default RequireAuth;