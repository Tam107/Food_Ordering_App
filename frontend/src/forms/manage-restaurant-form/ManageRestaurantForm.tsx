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
import {Restaurant} from "@/types.ts";
import {useEffect} from "react";

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

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

function ManageRestaurantForm({onSave, isLoading, restaurant}: Props) {

    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
        }
    });

    useEffect(() => {
        // if user visit the page in the first time, there are none restaurants then returns null
        if (!restaurant) {
            return
        }

        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));

        // ({}) => return an object
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2))
        }))

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }

        form.reset(updatedRestaurant)

    }, [form, restaurant])

    const onSubmit = (formDataJson: RestaurantFormData) => {
        //     Todo - convert formDataJson to a new FormData object
        const formData = new FormData()
        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)


        // 1GBG = 100 pence
        // 1.50GBP = 150 pence < lowest denomination
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })
        console.log("cuisines: ", formDataJson.cuisines)

        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        });
        formData.append(`imageFile`, formDataJson.imageFile)
        console.log("Form data:");
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        onSave(formData)
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
