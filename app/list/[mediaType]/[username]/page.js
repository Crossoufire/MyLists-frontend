"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Button, Form} from "react-bootstrap";

import {useUser} from "@/stuff/providers/UserProvider";
import {useFetchData2} from "@/stuff/hooks/FetchDataHook";
import NavigationMedia from "@/stuff/components/medialist/NavigationMedia";
import NavigationStatus from "@/stuff/components/medialist/NavigationStatus";
import MediaListData from "@/stuff/components/medialist/MediaListData";
import TitleStatus from "@/stuff/components/medialist/TitleStatus";
import SearchListMedia from "@/stuff/components/medialist/SearchListMedia";
import FilterAndSort from "@/stuff/components/medialist/FilterAndSort";
import ErrorPage from "@/stuff/pages/ErrorPage";
import Loading from "@/stuff/components/primitives/Loading";
import HLine from "@/stuff/components/primitives/HLine";


const MediaListPage = ({ params }) => {
	const { currentUser } = useUser();
	const searchParams = useSearchParams();
	const [showCommon, setShowCommon] = useState(true);
	const [paramsSearch, setParamsSearch] = useState(searchParams);
	const { apiData, loading, error } = useFetchData2(`/list/${params.mediaType}/${params.username}`,
		{...Object.fromEntries(paramsSearch)});

	useEffect(() =>{
		setShowCommon(true);
	}, [params.mediaType]);

	const updateSearchParams = async (updateFn, value) => {
		const params = new URLSearchParams(searchParams);
		const updateResult = updateFn(value);

		Object.entries(updateResult).forEach(([key, value]) => {
			params.append(key, value);
		});

		params.append("showCommon", showCommon);

		setParamsSearch(params);
	};

	// const updateSearchParams = async (updateFn, value) => {
	// 	await setSearchParams({
	// 		...updateFn(value),
	// 		showCommon: showCommon,
	// 	});
	// };

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
	if (apiData === undefined || params.mediaType !== apiData.media_type) return <Loading/>;


	return (
		<>
			<div className="d-flex media-navigation gap-4 m-t-35">
				<NavigationMedia
					userData={apiData.user_data}
					mediaType={params.mediaType}
				/>
				<SearchListMedia
					search={apiData.pagination.search}
					updateSearch={(value) => updateSearchParams(updateSearch, value)}
				/>
				{(currentUser.id !== apiData.user_data.id) &&
					<div className="d-flex gap-3 common-navigation">
						<div>{apiData.media_data.common_ids.length}/{apiData.media_data.total_media} common {params.mediaType}</div>
						<Form.Switch
							type="switch"
							value={showCommon}
							label="Hide common"
							onChange={updateCommon}
						/>
					</div>
				}
				<Link href={`/stats/${params.mediaType}/${apiData.user_data.username}`}>
					<Button>Stats</Button>
				</Link>
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
					mediaType={params.mediaType}
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
				mediaType={params.mediaType}
				updatePagination={(value) => updateSearchParams(updatePagination, value)}
			/>
		</>
	)
};


export default MediaListPage;
