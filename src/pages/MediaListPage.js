import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Form} from "react-bootstrap";

import {useFetchData2} from "../hooks/FetchDataHook";
import {useUser} from "../contexts/UserProvider";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import HLine from "../components/primitives/HLine";
import NavigationMedia from "../components/medialist/NavigationMedia";
import NavigationStatus from "../components/medialist/NavigationStatus";
import MediaListData from "../components/medialist/MediaListData";
import TitleStatus from "../components/medialist/TitleStatus";
import SearchListMedia from "../components/medialist/SearchListMedia";
import FilterAndSort from "../components/medialist/FilterAndSort";


export default function MediaListPage() {
	const { currentUser } = useUser();
	const { mediaType, username } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [showCommon, setShowCommon] = useState(true);
	const { apiData, loading, error } = useFetchData2(`/list/${mediaType}/${username}`,
		{...Object.fromEntries(searchParams)});


	useEffect(() =>{
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
			page: apiData.pagination.page,
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
				<SearchListMedia
					search={apiData.pagination.search}
					updateSearch={(value) => updateSearchParams(updateSearch, value)}
				/>
				{(currentUser.id !== apiData.user_data.id) &&
					<div className="d-flex gap-3 common-navigation">
						<div>{apiData.media_data.common_ids.length}/{apiData.media_data.total_media} common {mediaType}</div>
						<Form.Switch
							type="switch"
							value={showCommon}
							label="Hide common"
							onChange={updateCommon}
						/>
					</div>
				}
			</div>

			<NavigationStatus
				allStatus={apiData.pagination.all_status}
				activeStatus={apiData.pagination.status}
				updateStatus={(value) => updateSearchParams(updateStatus, value)}
			/>

			<div className="d-flex justify-content-between m-t-35">
				<TitleStatus
					status={apiData.pagination.status}
					total={apiData.pagination.total}
				/>
				<FilterAndSort
					mediaType={mediaType}
					paginateData={apiData.pagination}
					updateLang={(value) => updateSearchParams(updateLang, value)}
					updateGenre={(value) => updateSearchParams(updateGenre, value)}
					updateSorting={(value) => updateSearchParams(updateSorting, value)}
				/>
			</div>
			<HLine mtop={2}/>

			<MediaListData
				loading={loading}
				apiData={apiData}
				isCurrent={apiData.user_data.id === currentUser.id}
				mediaType={mediaType}
				updatePagination={(value) => updateSearchParams(updatePagination, value)}
			/>
		</>
	)
};
