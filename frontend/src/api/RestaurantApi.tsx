import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "react-query";
import {toast} from "sonner";
import {Restaurant} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    // Promise is defined as a return type for this function
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })

        if (!response.ok) {
            throw new Error("Failed to get restaurant")
        }
        return response.json()
    };

    const {data: restaurant, isLoading} = useQuery("fetchRestaurant", getMyRestaurantRequest)

    return {restaurant, isLoading}
}

export const useCreateRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        console.log("Form data backend", restaurantFormData)
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData

        })
        console.log("response: ", response)

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    }

    const {mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createRestaurantRequest);

    if (isSuccess) {
        toast.success("Successfully create restaurant");
    }

    if (error) {
        toast.error("Unable to create restaurant");
    }

    return {createRestaurant, isSuccess, isLoading};
}