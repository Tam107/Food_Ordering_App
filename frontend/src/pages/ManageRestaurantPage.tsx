import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant, useGetRestaurant} from "@/api/RestaurantApi.tsx";

const ManageRestaurantPage = () => {

    const {createRestaurant, isLoading} = useCreateRestaurant();
    const {restaurant} = useGetRestaurant()

    return (
        <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isLoading}/>
    )
}
export default ManageRestaurantPage
