import {useAuth0} from "@auth0/auth0-react";
import {useMutation} from "react-query";
import {toast} from "sonner";
import {Restaurant} from "@/types.ts";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export const useCreateRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async (restaurantFormData: FormData) : Promise<Restaurant[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        })

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    }

    const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createRestaurantRequest);

    if (isSuccess){
        toast.success("Successfully create restaurant");
    }

    if (error){
        toast.error("Unable to create restaurant");
    }

    return {createRestaurant, isSuccess, isLoading};
}