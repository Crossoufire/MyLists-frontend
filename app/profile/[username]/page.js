"use client";
import {Row, Col} from "react-bootstrap";

import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import MediaLevels from "@/stuff/components/profile/MediaLevels";
import UserUpdates from "@/stuff/components/profile/UserUpdates";
import ProfileMiscInfo from "@/stuff/components/profile/ProfileMiscInfo";
import GlobalStats from "@/stuff/components/profile/GlobalStats";
import MediaDetails from "@/stuff/components/profile/MediaDetails";
import ProfileFollows from "@/stuff/components/profile/ProfileFollows";


const ProfileData = ({ params }) => {
	const { apiData } = useFetchData(`/profile/${params.username}`);

	return (
		<Row id="profile-info" className="gx-3 m-t-15 m-b-20">
			<Col md={5} lg xl={3}>
				<MediaLevels
					username={params.username}
					mediaLevels={apiData.list_levels}
				/>
				<div className="m-t-15"/>
				<UserUpdates
					username={params.username}
					updates={apiData.user_updates}
					followers={false}
				/>
				<div className="m-t-15"/>
				<ProfileMiscInfo
					user={apiData.user_data}
					mediaData={apiData.list_levels}
				/>
				<div className="m-t-15"/>
			</Col>
			<Col md lg xl>
				<GlobalStats
					userData={apiData.user_data}
					global={apiData.media_global}
				/>
				<div className="m-t-15"/>
				<MediaDetails
					userData={apiData.user_data}
					mediaData={apiData.media_data}
				/>
				<div className="m-t-15"/>
			</Col>
			<Col md={5} lg xl={3}>
				<ProfileFollows
					username={params.username}
					follows={apiData.follows}
				/>
				<div className="m-t-15"/>
				<UserUpdates
					username={params.username}
					updates={apiData.follows_updates}
					followers={true}
				/>
			</Col>
		</Row>
	);
};


export default ProfileData;

