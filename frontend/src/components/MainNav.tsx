import {Button} from "@/components/ui/button.tsx";
import {useAuth0} from "@auth0/auth0-react";

const MainNav = () => {
    const {loginWithRedirect} = useAuth0()



    return (
        <Button variant={"ghost"} className={"text-2xl font-bold hover:text-orange-500 hover:bg-white"}
        onClick={async () => await loginWithRedirect()}>
            Login
        </Button>
    )
}
export default MainNav
