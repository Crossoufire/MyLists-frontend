"use client";
import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import ProfileHeader from "@/stuff/components/profile/ProfileHeader";
import ErrorPage from "@/stuff/pages/ErrorPage";
import Loading from "@/stuff/components/primitives/Loading";


const ProfileLayout = ({ params, children }) => {
    const { apiData, loading, error } = useFetchData(`/profile/${params.username}`)

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading/>;

    return (
        <>
            <ProfileHeader
                user={apiData.user_data}
                initFollow={apiData.is_following}
                followId={apiData.user_data.id}
            />
            {children}
        </>
    );
};


export default ProfileLayout;
