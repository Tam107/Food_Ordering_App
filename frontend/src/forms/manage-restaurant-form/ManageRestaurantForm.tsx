import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),

    city: z.string({
        required_error: "city name is required",
    }),

    country: z.string({
        required_error: "country is required",
    }),
    // coerce to convert string to number
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "delivery price must be a valid number",
    }),

    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one cuisine",
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price must be greater than 0"),
    })),
    imageFile: z.instanceof(File, {
        message: "image file is required",
    })
})

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

function ManageRestaurantForm({onSave, isLoading}: Props) {

    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{name: "", price: 0}],
            imageFile: undefined,
        }
    });
    console.log(onSave, isLoading)

    const onSubmit = (formDataJson: restaurantFormData) => {
        //     Todo - convert formDataJson to a new FormData object
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 p-5 bg-gray-50 rounded-lg"}>
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImageSection/>
                {isLoading ? <LoadingButton/> : <Button type={"submit"}>Submit</Button>}
            </form>
        </Form>
    )
}


export default ManageRestaurantForm
