import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {CircleUserRound, Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import { Button } from './ui/button';
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLinks from "@/components/MobileNavLinks.tsx";

const MobileNav = () => {

    const {isAuthenticated, loginWithRedirect, user } = useAuth0()

    return (
        // - Sheet là một component để tạo ra một panel có thể trượt vào/ra từ cạnh màn hình (thường dùng cho mobile)
        <Sheet>
            {/*- (nút bấm) để mở Sheet*/}
            <SheetTrigger>
             <Menu className={"text-orange-500"}/>
            </SheetTrigger>
            {/*- Chứa nội dung chính của Sheet khi nó được mở ra*/}
            <SheetContent className={"space-y-3"}>
                <SheetTitle>
                    {isAuthenticated ? (<span className={"flex items-center font-bold gap-2"}>
                        <CircleUserRound className={"text-orange-500"}/>
                        {user?.email}
                    </span>) : (
                        <span className={"text-orange-500 flex justify-center font-bold"}>Login to MernEats</span>
                    )}
                </SheetTitle>

                {/*- Chứa nội dung chính của Sheet khi nó được mở ra*/}
                <Separator/>
                <SheetDescription className={"flex flex-col gap-4"}>
                    {isAuthenticated ? <MobileNavLinks/> : (
                        <Button onClick={()=> loginWithRedirect()} className={"flex-1 font-bold bg-orange-500 text-white"}>
                            Login
                        </Button>
                    )}

                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;