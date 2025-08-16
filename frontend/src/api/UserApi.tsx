import {useMutation} from "react-query";
import {useAuth0} from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

console.log("API_BASE_URL: ", API_BASE_URL)

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