"use client";
import React from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {FaPlus} from "react-icons/fa";

import {useUser} from "@/stuff/providers/UserProvider";
import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import useConfirmation from "@/stuff/hooks/ConfirmationHook";
import useApiUpdater from "@/stuff/hooks/UserUpdateAPI";
import useLoading from "@/stuff/hooks/LoadingHook";
import MediaDataDetails from "@/stuff/components/media/general/MediaDataDetails";
import FollowCard from "@/stuff/components/media/general/FollowCard";
import SimilarMedia from "@/stuff/components/media/general/SimilarMedia";
import UserListDetails from "@/stuff/components/media/general/UserListDetails";
import RefreshMedia from "@/stuff/components/media/general/RefreshMedia";
import Loading from "@/stuff/components/primitives/Loading";
import HLine from "@/stuff/components/primitives/HLine";
import ErrorPage from "@/stuff/pages/ErrorPage";


const MediaDetailsPage = ({ params }) => {
	const router = useRouter();
	const { currentUser } = useUser();
	const searchParams = useSearchParams();
	const [isLoading, handleLoading] = useLoading();
	const { show, ConfirmationModal } = useConfirmation();
	const { refresh, addMedia, deleteMedia } = useApiUpdater(params.mediaId, params.mediaType);
	const { apiData, loading, error, mutate } = useFetchData(`/details/${params.mediaType}/${params.mediaId}`,
		{...Object.fromEntries(searchParams)});

	const handleAddMediaUser = async () => {
		const response = await handleLoading(addMedia);
		if (response) {
			await mutate({...apiData, user_data: response}, false);
		}
	};
	const callbackDeleteMedia = async () => {
		await mutate({...apiData, user_data: false}, false);
	};

	if (error) return <ErrorPage error={error}/>
	if (loading) return <Loading/>;
	if (apiData.redirect) return router.push(`/details/${params.mediaType}/${apiData.media.id}`, { replace: true });


	return (
		<div className="details-wrapper">
			<h3 className="d-flex justify-content-between m-t-30">
				{apiData.media.name}
				{currentUser.role !== "user" &&
					<RefreshMedia
						updateRefresh={refresh}
						reloadByMutate={mutate}
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
							alt={"media_cover"}
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
											<span>
												<FaPlus size={13} className="m-b-2"/>
												&nbsp; Add to your list
											</span>
										}
									</Button>
								</div>
							</div>
							:
							<UserListDetails
								key={apiData.media.id}
								mediaId={apiData.media.id}
								mediaType={params.mediaType}
								userData={apiData.user_data}
								totalPages={apiData.media.pages}
								deleteMedia={deleteMedia}
								callbackDelete={callbackDeleteMedia}
								show={show}
							/>
						}
					</div>
				</Col>
				<Col md lg>
					<MediaDataDetails
						mediaData={apiData.media}
						mediaType={params.mediaType}
					/>
					<SimilarMedia
						mediaType={params.mediaType}
						similarMedia={apiData.media.similar_media}
					/>
				</Col>
			</Row>
			{apiData.follows_data.length !== 0 &&
				<div className="follow-margin m-b-50 m-t-30">
					<h4>Follows</h4>
					<HLine/>
					<div className="d-flex flex-row flex-wrap gap-4">
						{apiData.follows_data.map(follow =>
							<FollowCard
								key={follow.username}
								follow={follow}
								mediaType={params.mediaType}
							/>
						)}
					</div>
				</div>
			}
			{(params.mediaType === "books" || currentUser.role !== "user") &&
				<div className="d-flex justify-content-end m-t-50">
					<Link href={`/edit/${params.mediaType}/${params.mediaId}`}>
						<Button variant="warning" className="text-dark">Edit Media</Button>
					</Link>
				</div>
			}
			<ConfirmationModal/>
		</div>
	);
};


export default MediaDetailsPage
