import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useUpdateUser} from "@/api/UserApi.tsx";

function UserProfilePage() {

    const {updateUser, isLoading} = useUpdateUser();

    return (
        <>
            <UserProfileForm onSave={updateUser} isLoading={isLoading}/>
        </>
    )
}

export default UserProfilePage
