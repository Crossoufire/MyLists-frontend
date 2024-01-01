import React, {Fragment, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import {useUser} from "../providers/UserProvider";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import {useFetchData2} from "../hooks/FetchDataHook";
import NavigationMedia from "../components/medialist/NavigationMedia";
import NavigationStatus from "../components/medialist/NavigationStatus";
import MediaListData from "../components/medialist/MediaListData";
import TitleStatus from "../components/medialist/TitleStatus";
import SearchMediaList from "../components/medialist/SearchMediaList";
import FilterAndSort from "../components/medialist/FilterAndSort";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import HLine from "../components/primitives/HLine";
import CommonMedia from "../components/medialist/CommonMedia";
import MediaListStats from "../components/medialist/MediaListStats";
import MediaLabels from "../components/medialist/MediaLabels";


const MediaListPage = () => {
	const { currentUser } = useUser();
	const { mediaType, username } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [showCommon, setShowCommon] = useState(true);
	const { apiData, loading, error } = useFetchData2(`/list/${mediaType}/${username}`,
		{...Object.fromEntries(searchParams)});

	useEffect(() => {
		setShowCommon(true);
	}, [mediaType]);

	const updateSearchParams = async (updateFn, value) => {
		await setSearchParams({
			...updateFn(value),
			showCommon: showCommon,
		});
	};
	const updateSearch = (search) => ({
		status: "Search",
		search: search,
	});
	const updateStatus = (status) => ({
		status: status,
	});
	const updateGenre = (genre) => ({
		sorting: apiData.pagination.sorting,
		status: apiData.pagination.status,
		genre: genre,
		lang: apiData.pagination.lang,
	});
	const updateSorting = (sorting) => ({
		sorting: sorting,
		status: apiData.pagination.status,
		genre: apiData.pagination.genre,
		lang: apiData.pagination.lang,
	});
	const updateLang = (lang) => ({
		sorting: apiData.pagination.sorting,
		status: apiData.pagination.status,
		genre: apiData.pagination.genre,
		lang: lang,
	});
	const updateLabel = (label) => ({
		status: apiData.pagination.status,
		label_name: label,
	});
	const updatePagination = (page) => ({
		search: apiData.pagination.search,
		sorting: apiData.pagination.sorting,
		status: apiData.pagination.status,
		genre: apiData.pagination.genre,
		lang: apiData.pagination.lang,
		page: page,
	});
	const updateCommon = async () => {
		const data = {
			search: apiData.pagination.search,
			sorting: apiData.pagination.sorting,
			status: apiData.pagination.status,
			genre: apiData.pagination.genre,
			lang: apiData.pagination.lang,
			page: 1,
		}

		await setSearchParams({
			...data,
			showCommon: !showCommon,
		});

		setShowCommon(!showCommon);
	};

	if (error) return <ErrorPage error={error}/>
	if (apiData === undefined || mediaType !== apiData.media_type) return <Loading/>;


	return (
		<>
			<div className="d-flex media-navigation gap-4 m-t-35">
				<NavigationMedia
					userData={apiData.user_data}
					mediaType={mediaType}
				/>
				<SearchMediaList
					search={apiData.pagination.search}
					updateSearch={(value) => updateSearchParams(updateSearch, value)}
					condition={currentUser.username === username ? "your" : username}
				/>
				{(currentUser.id !== apiData.user_data.id) &&
					<CommonMedia
						apiData={apiData}
						mediaType={mediaType}
						showCommon={showCommon}
						updateCommon={updateCommon}
					/>
				}
			</div>
			<NavigationStatus
				allStatus={apiData.pagination.all_status}
				activeStatus={apiData.pagination.status}
				updateStatus={(value) => updateSearchParams(updateStatus, value)}
			/>
			<div className="d-flex justify-content-between m-t-25">
				<TitleStatus
					status={apiData.pagination.status}
					total={apiData.pagination.total}
					title={apiData.pagination.title}
				/>
				{!["Stats", "Search", "Labels"].includes(apiData.pagination.status) &&
					<FilterAndSort
						mediaType={mediaType}
						paginateData={apiData.pagination}
						updateLang={(value) => updateSearchParams(updateLang, value)}
						updateGenre={(value) => updateSearchParams(updateGenre, value)}
						updateSorting={(value) => updateSearchParams(updateSorting, value)}
					/>
				}
			</div>
			<HLine mtop={2}/>
			{apiData.pagination.status === "Stats" ?
				<MediaListStats
					mediaType={mediaType}
					graphData={apiData.media_data.graph_data}
				/>
				:
				apiData.pagination.status === "Labels" ?
					<MediaLabels
						mediaType={mediaType}
						labels={apiData.media_data.labels}
						labelsMedia={apiData.media_data.labels_media}
						isCurrent={currentUser.username === username}
						updateLabel={(value) => updateSearchParams(updateLabel, value)}
						loading={loading}
					/>
					:
					<MediaListData
						loading={loading}
						apiData={apiData}
						isCurrent={apiData.user_data.id === currentUser.id}
						mediaType={mediaType}
						updatePagination={(value) => updateSearchParams(updatePagination, value)}
					/>
			}
		</>
	);
};


export default withPrivateRoute(MediaListPage);
