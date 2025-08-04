import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import { Button } from './ui/button';

const MobileNav = () => {

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
                    <span>Welcome to MernEats.com!</span>
                </SheetTitle>

                {/*- Chứa nội dung chính của Sheet khi nó được mở ra*/}
                <Separator/>
                <SheetDescription className={"flex"}>
                    <Button className={"flex-1 font-bold bg-orange-500 text-white"}>
                        Login
                    </Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;