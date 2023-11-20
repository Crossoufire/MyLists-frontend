import React from "react";
import {useParams} from "react-router-dom";

import {useFetchData} from "../hooks/FetchDataHook";
import ErrorPage from "./ErrorPage";
import FollowsFollowers from "../components/profile/FollowsFollowers";
import ProfileHeader from "../components/profile/ProfileHeader";
import AllUpdates from "../components/profile/AllUpdates";
import Loading from "../components/primitives/Loading";
import ProfileData from "../components/profile/ProfileData";


const componentToLoad = (extension) => {
	const components = {
		history: AllUpdates,
		follows: FollowsFollowers,
		followers: FollowsFollowers,
		undefined: ProfileData,
		default: ErrorPage,
	};

	return components[extension] || components.default;
};


export default function ProfilePage() {
	const { username, extension } = useParams();
	const { apiData, loading, error } = useFetchData(`/profile/${username}`)

	if (error) return <ErrorPage error={error}/>;
	if (loading) return <Loading/>;

	const ProfileComponent = componentToLoad(extension);


	return (
		<>
			<ProfileHeader
				user={apiData.user_data}
				initFollow={apiData.is_following}
				followId={apiData.user_data.id}
			/>
			<ProfileComponent
				username={username}
				extension={extension}
				apiData={apiData}
			/>
		</>
	);
}
