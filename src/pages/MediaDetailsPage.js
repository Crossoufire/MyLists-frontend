import React from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Col, Image, Row} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";

import {useUser} from "../contexts/UserProvider";
import {useFetchData} from "../hooks/FetchDataHook";
import {useApiUpdater} from "../hooks/UserUpdateAPI";
import MediaDataDetails from "../components/media/general/MediaDataDetails";
import FollowCard from "../components/media/general/FollowCard";
import SimilarMedia from "../components/media/general/SimilarMedia";
import UserListDetails from "../components/media/general/UserListDetails";
import RefreshMedia from "../components/media/general/RefreshMedia";
import Loading from "../components/primitives/Loading";
import HLine from "../components/primitives/HLine";
import ErrorPage from "./ErrorPage";
import {useLoading} from "../hooks/LoadingHook";


function EditMedia({ mediaType, mediaId }) {
	return (
		<div className="d-flex justify-content-end m-t-20">
			<Link to={`/details/form/${mediaType}/${mediaId}`}>
				<Button variant="warning" className="text-dark">Edit Media</Button>
			</Link>
		</div>
	);
}


export default function MediaDetailsPage() {
	const {currentUser} = useUser();
	const {mediaId, mediaType} = useParams();
	const [isLoading, handleLoading] = useLoading();
	const {refresh, addMedia, deleteMedia} = useApiUpdater(mediaId, mediaType);
	const {apiData, setApiData, loading, error, refetchData} = useFetchData(`/details/${mediaType}/${mediaId}`);

	const callbackRefresh = async () => {
		await refetchData();
	};
	const handleAddMediaUser = async () => {
		const response = await handleLoading(addMedia);
		if (response) {
			setApiData({
				...apiData,
				user_data: response,
			});
		}
	};
	const callbackDeleteMedia = () => {
		setApiData({
			...apiData,
			user_data: false,
		});
	};

	if (error?.status) {
		return <ErrorPage {...error}/>
	}

	if (loading || apiData === undefined) {
		return <Loading/>;
	}


	return (
		<div className="details-wrapper">
			<h3 className="d-flex justify-content-between m-t-30">
				{apiData.media.name}
				{currentUser.role !== "user" &&
					<RefreshMedia
						updateRefresh={refresh}
						callbackRefresh={callbackRefresh}
					/>
				}
			</h3>
			<HLine/>
			<Row>
				<Col sm={12} md={5} lg={4}>
					<div className="d-flex justify-content-center justify-content-sm-start">
						<Image
							style={{borderRadius: 7}}
							height={450}
							width={300}
							src={apiData.media.media_cover}
							alt="media_cover"
						/>
					</div>
					<div className="d-flex justify-content-center justify-content-sm-start">
						{!apiData.user_data ?
							<div className="m-t-15" style={{width: 300}}>
								<div className="d-flex justify-content-center">
									<Button className="shadow-0 m-b-20" variant="primary" onClick={handleAddMediaUser}>
										{isLoading ?
											<span>Loading...</span>
											:
											<><FaPlus size={13} className="m-b-2"/>&nbsp; Add to your list</>
										}
									</Button>
								</div>
							</div>
							:
							<UserListDetails
								key={apiData.media.id}
								mediaId={apiData.media.id}
								mediaType={mediaType}
								userData={apiData.user_data}
								totalPages={apiData.media.pages}
								deleteMedia={deleteMedia}
								callbackDelete={callbackDeleteMedia}
							/>
						}
					</div>
				</Col>
				<Col md lg>
					<MediaDataDetails
						mediaData={apiData.media}
						mediaType={mediaType}
					/>
					<SimilarMedia
						mediaType={mediaType}
						similarMedia={apiData.media.similar_media}
					/>
				</Col>
			</Row>
			{apiData.follows_data.length !== 0 &&
				<div className="follow-margin m-b-30 m-t-30">
					<h4>Follows</h4>
					<HLine/>
					<div className="d-flex flex-row align-content-start flex-wrap gap-4">
						{apiData.follows_data.map(follow =>
							<FollowCard
								key={follow.username}
								follow={follow}
								mediaType={mediaType}
							/>
						)}
					</div>
				</div>
			}
			{mediaType === "books" ?
				<EditMedia
					mediaType={mediaType}
					mediaId={apiData.media.id}
				/>
				:
				currentUser.role !== "user" &&
				<EditMedia
					mediaType={mediaType}
					mediaId={apiData.media.id}
				/>
			}
		</div>
	);
}