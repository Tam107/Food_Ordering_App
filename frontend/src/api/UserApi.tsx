import {useMutation, useQuery} from "react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";
import {User} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useGetUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }
        return response.json();
    }
    const {
        data: user,
        isLoading,
        error,
    } = useQuery('user', getUserRequest);

    if (error) {
        toast.error(`Error fetching user: ${error.toString()}`);
    }

    return {user, isLoading, error};
}

type CreateUserRequest = {
    auth0Id: string;
    email: string;
    name: string;
}


export const useCreateUser = () => {

    // It retrieves an Access Token without requiring the user to interactively log in again, it's done in the background.
    const {getAccessTokenSilently} = useAuth0();

    const createUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Error creating user: ${response.statusText}`);
        }
    }

    /*useMutation trong React Query là một hook được sử dụng để thực hiện các hành động thay đổi dữ liệu, chẳng hạn như POST,
     PUT, DELETE hoặc bất kỳ yêu cầu API nào có thể thay đổi trạng thái của dữ liệu. Khác với useQuery*/
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createUserRequest);

    return {createUser, isLoading, isError, isSuccess};
}

type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateUser = () => {

    const {getAccessTokenSilently} = useAuth0();

    // need to define the type for formData
    const updateUserRequest = async (formData: UpdateUserRequest) => {

        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        return response.json();
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    } = useMutation(updateUserRequest);

    if (isSuccess) {
        toast.success("Update user successfully!");
    }

    if (error) {
        toast.error(`Error updating user: ${error.toString()}`);
        reset(); // Reset the mutation state after handling the error
    }

    return {updateUser, isLoading, error, isSuccess};

}