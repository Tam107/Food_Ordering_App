import {useAuth0} from "@auth0/auth0-react";
import {useCreateUser} from "@/api/UserApi.tsx";
import {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthCallbackPage is responsible for handling the authentication
 * callback, creating a user in the application if they do not already exist, and navigating
 * the user to the home page after login.
 *
 * This component uses the following hooks:
 * - `useNavigate` to navigate to the home page after processing.
 * - `useAuth0` to retrieve the authenticated user's information.
 * - `useCreateUser` to handle the creation of a new user in the application's database.
 * - `useRef` to maintain a reference (`hasCreatedUser`) to ensure a user is created only once.
 * - `useEffect` to perform the user creation and navigation logic when component mounts or
 *   when dependencies update.
 *
 * Note:
 * Ensure the `createUser` function properly handles the backend logic for user creation
 * and that `useAuth0` provides the necessary user info (e.g., `sub`, `email`).
 */
const AuthCallbackPage = () => {

    const navigate = useNavigate();
    const {user} = useAuth0();
    const {createUser} = useCreateUser();

    // This is to prevent multiple user creation requests, store the state of user creation
    const hasCreatedUser = useRef(false)

    useEffect(() => {
        // current function return to access the current value of the ref
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({auth0Id: user.sub, email: user.email, name: user.name || ""})
            hasCreatedUser.current = true
        }
        navigate("/")
    }, [createUser, navigate, user])

    return (
        <div>Loading....</div>
    )
}

export default AuthCallbackPage
