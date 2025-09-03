import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant} from "@/api/RestaurantApi.tsx";

const ManageRestaurantPage = () => {

    const {createRestaurant, isLoading} = useCreateRestaurant();

    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    )
}
export default ManageRestaurantPage
