import {Link} from "react-router-dom";
import { Button } from "./ui/button";
import {useAuth0} from "@auth0/auth0-react";

function MobileNavLinks() {
    const {logout} = useAuth0()

    return (
        <>
        <Link className={"flex bg-white items-center font-bold hover:text-orange-500"} to={"/user-profile"}>
            User Profile
        </Link>
            <Button onClick={() => logout()} className={"flex items-center font-bold px-3 hover:background-grey-400"}>
                Logout
            </Button>
        </>
    )
}

export default MobileNavLinks
