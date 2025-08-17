import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
});

// z.infer<> giúp suy ra (infer) automatically kiểu dữ liệu từ schema.
// Tức là UserFormData sẽ có tất cả các field giống y như formSchema đã định nghĩa.
type UserFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean
}

function UserProfileForm({onSave, isLoading}: Props) {
    console.log(isLoading)
    // Sử dụng useForm hook từ react-hook-form để tạo form
    const form = useForm<UserFormData>({
        // Nói với react-hook-form sử dụng schema của zod để validate
        resolver: zodResolver(formSchema),
    })

    return (
        // get all properties from form object and pass to Form component
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className={"space-y-4 bg-gray-50 rounded-lg md:p-10"}>
                <div>
                    <h2 className={"text-2xl font-bold"}>User profile form</h2>
                    <FormDescription>
                        View and change your profile information.
                    </FormDescription>
                </div>
                {/*form.control là phần quản lý trạng thái của form mà bạn đã tạo bằng useForm.
                render nhận một đối tượng field, mà trong đó chứa các giá trị và phương thức cần thiết để quản lý trường dữ liệu
                e.g: value, onChange, onBlur, ref, v.v.
                */}
                <FormField control={form.control} name={"email"} render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                    </FormItem>
                )}/>
                <FormField control={form.control} name={"name"} render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className={"bg-white"}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div className={"flex flex-col md:flex-row gap-4"}>
                    <FormField control={form.control} name={"addressLine1"} render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>Address Line1</FormLabel>
                            <FormControl>
                                <Input {...field} className={"bg-white"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name={"city"} render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className={"bg-white"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name={"country"} render={({field}) => (
                        <FormItem className={"flex-1"}>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className={"bg-white"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>
                {isLoading ? <LoadingButton/> : <Button type={"submit"} className={"bg-orange-500"}>Save</Button>}
            </form>
        </Form>
    )
}

export default UserProfileForm
