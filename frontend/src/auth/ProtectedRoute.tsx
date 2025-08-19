import {useAuth0} from "@auth0/auth0-react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0();

    // Outlet is used to render child components if the user is authenticated
    return isAuthenticated ? (<Outlet/>) : (<Navigate to={"/"}/>)
}
export default ProtectedRoute
