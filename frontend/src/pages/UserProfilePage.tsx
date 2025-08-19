import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useGetUser, useUpdateUser} from "@/api/UserApi.tsx";

function UserProfilePage() {

    const {user, isLoading: isGetLoading} = useGetUser()
    const {updateUser, isLoading: isUpdateLoading} = useUpdateUser();

    if (isGetLoading) {
        return <div>Loading user profile...</div>;
    }

    if (!user) {
        return <div>User not found</div>
    }


    return (
        <>

            <UserProfileForm user={user} onSave={updateUser} isLoading={isUpdateLoading}/>
        </>
    )
}

export default UserProfilePage
