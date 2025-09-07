import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant, useGetRestaurant, useUpdateRestaurant} from "@/api/RestaurantApi.tsx";

const ManageRestaurantPage = () => {

    const {createRestaurant, isLoading: isCreateLoading} = useCreateRestaurant();
    const {restaurant} = useGetRestaurant()
    const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();

    // !! a boolean expression to check restaurant existing
    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm
            onSave={isEditing ? updateRestaurant : createRestaurant}
            restaurant={restaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    )
}
export default ManageRestaurantPage
