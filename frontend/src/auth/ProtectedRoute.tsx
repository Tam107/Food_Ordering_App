import {useAuth0} from "@auth0/auth0-react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return null
    }

    if(isAuthenticated){
        return <Outlet/>
    }

    // Outlet is used to render child components if the user is authenticated
    return <Navigate to={"/"}/>
}
export default ProtectedRoute
