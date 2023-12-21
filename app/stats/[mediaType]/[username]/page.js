"use client";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

import {useUser} from "@/stuff/providers/UserProvider";
import {useApi} from "@/stuff/providers/ApiProvider";
import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import ErrorPage from "@/stuff/pages/ErrorPage";
import Loading from "@/stuff/components/primitives/Loading";
import MediaListStats from "@/stuff/components/medialist/MediaListStats";
import HLine from "@/stuff/components/primitives/HLine";
import NavigationMedia from "@/stuff/components/medialist/NavigationMedia";


const MediaStatsPage = ({ params }) => {
    const api = useApi();
    const { currentUser } = useUser();
    const [compareData, setCompareData] = useState();
    const [compareMode, setCompareMode] = useState(false);
    const { apiData, error } = useFetchData(`/stats/${params.mediaType}/${params.username}`);

    useEffect(() => {
        if (compareMode) {
            const fetchCompareData = async () => {
                try {
                    const response = await api.get(`/stats/${params.mediaType}/${currentUser.username}`);
                    setCompareData(response.body.data.stats);
                } catch (error) {
                    console.error("Error fetching compare data", error);
                }
            };

            fetchCompareData();
        }
        else {
            setCompareData(null);
        }
    }, [compareMode, params.mediaType]);

    if (error) return <ErrorPage error={error}/>
    if (apiData === undefined || params.mediaType !== apiData.media_type) return <Loading/>;

    return (
        <>
            <div className="d-flex media-navigation gap-4 m-t-35">
                <NavigationMedia
                    userData={apiData.user_data}
                    mediaType={params.mediaType}
                    isStats={true}
                />
                {currentUser.id !== apiData.user_data.id &&
                    <Button onClick={() => setCompareMode(!compareMode)}>
                        {compareMode ? "Stop Comparing" : "Compare With My Stats"}
                    </Button>
                }
            </div>
            <h3 className="m-t-30">{`${params.username} ${params.mediaType}'s stats`}</h3>
            <HLine/>
            <MediaListStats
                mediaType={params.mediaType}
                graphData={apiData.stats}
                compareData={compareData}
            />
        </>

    );
};


export default MediaStatsPage;