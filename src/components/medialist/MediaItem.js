import React, {useState} from "react";
import {Card, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import {getUserMetric} from "../../utils/functions";
import useApiUpdater from "../../hooks/UserUpdateAPI";
import StatusAndDelete from "./StatusAndDelete";
import UserMediaInfo from "./UserMediaInfo";
import AddFromOtherList from "./AddFromOtherList";
import SuppMediaInfo from "./SuppMediaInfo";
import LoadingIcon from "../primitives/LoadingIcon";
import useLoading from "../../hooks/LoadingHook";


export default function MediaItem({ isCurrent, mediaType, userData, mediaData, isCommon, activeStatus }) {
	const [hideMedia, setHideMedia] = useState(false);
	const updateUserAPI = useApiUpdater(mediaData.media_id, mediaType);
	const userMetric = getUserMetric(userData.add_feeling, mediaData);
	const [stateIsCommon, setStateIsCommon] = useState(isCommon);
	const [isLoading, handleLoading] = useLoading();
	const rmCorner = mediaType !== "movies" && "rm-round-corner";

	const handleRemoveMedia = async () => {
		if (!window.confirm("Remove this media from your list?")) {
			return;
		}

		const response = await handleLoading(updateUserAPI.deleteMedia);
		if (response) {
			setHideMedia(true);
		}
	};
	const handleStatus = async (ev) => {
		await handleLoading(updateUserAPI.status, ev.target.value);
		setHideMedia(true);
	};
	const handleAddFromOtherList = async (ev) => {
		await handleLoading(updateUserAPI.addMedia, ev.target.value);
		setStateIsCommon(!stateIsCommon);
	};

	if (hideMedia) {
		return;
	}


	return (
		<Col xs={4} sm={3} md={3} lg={2} xl={2}>
			<Card className="bg-transparent border-0">
				<div className="overlay-container">
					<Image
						className={"medialist-img " + rmCorner}
						src={mediaData.media_cover}
						height={300}
						width={200}
						style={{height: "auto"}}
						alt={mediaData.media_name}
					/>
					<Link className="overlay" to={"/details/"+mediaType+"/"+mediaData.media_id}>
						<span className="overlay-text text-light fs-24">{mediaData.media_name}</span>
					</Link>
					{isLoading &&
						<div className="remove-media-loading-overlay">
							<LoadingIcon loading={true} size={20}/>
						</div>
					}
					{isCurrent ?
						<StatusAndDelete
							mediaId={mediaData.media_id}
							allStatus={mediaData.all_status}
							mediaStatus={mediaData.status}
							activeStatus={activeStatus}
							handleStatus={handleStatus}
							removeMedia={handleRemoveMedia}
						/>
						:
						<>
							{stateIsCommon ?
								<div className="ribbon-common"/>
								:
								<AddFromOtherList
									mediaId={mediaData.media_id}
									allStatus={mediaData.all_status}
									activeStatus={activeStatus}
									handleAddFromOtherList={handleAddFromOtherList}
								/>
							}
						</>
					}
				</div>
				{activeStatus === "All" || activeStatus === "Search" &&
					<div className="all-status-info">{mediaData.status}</div>
				}
				<UserMediaInfo
					isCurrent={isCurrent}
					mediaType={mediaType}
					mediaData={mediaData}
					userMetric={userMetric}
					updateUserAPI={updateUserAPI}
				/>
			</Card>
			<SuppMediaInfo
				isCurrent={isCurrent}
				mediaType={mediaType}
				mediaData={mediaData}
				updateUserAPI={updateUserAPI}
			/>
		</Col>
	);
};
