import React from "react";
import {useParams} from "react-router-dom";

import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import {useFetchData} from "../hooks/FetchDataHook";
import FollowsFollowers from "../components/profile/FollowsFollowers";
import ProfileHeader from "../components/profile/ProfileHeader";
import AllUpdates from "../components/profile/AllUpdates";
import Loading from "../components/primitives/Loading";
import ProfileData from "../components/profile/ProfileData";
import ErrorPage from "./ErrorPage";


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


const ProfilePage = () => {
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
};


export default withPrivateRoute(ProfilePage);
