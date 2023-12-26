import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";

import {useUser} from "../providers/UserProvider";
import {useApi} from "../providers/ApiProvider";
import {useFetchData} from "../hooks/FetchDataHook";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import MediaListStats from "../components/medialist/MediaListStats";
import HLine from "../components/primitives/HLine";
import NavigationMedia from "../components/medialist/NavigationMedia";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";


const MediaStatsPage = () => {
    const api = useApi();
    const { currentUser } = useUser();
    const { mediaType, username } = useParams();
    const [compareMode, setCompareMode] = useState(false);
    const [compareData, setCompareData] = useState();
    const { apiData, error } = useFetchData(`/stats/${mediaType}/${username}`);

    useEffect(() => {
        if (compareMode) {
            const fetchCompareData = async () => {
                try {
                    const response = await api.get(`/stats/${mediaType}/${currentUser.username}`);
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
    }, [compareMode, mediaType]);

    if (error) return <ErrorPage error={error}/>
    if (apiData === undefined || mediaType !== apiData.media_type) return <Loading/>;

    return (
        <>
            <div className="d-flex media-navigation gap-4 m-t-35">
                <NavigationMedia
                    userData={apiData.user_data}
                    mediaType={mediaType}
                    isStats={true}
                />
                {currentUser.id !== apiData.user_data.id &&
                    <Button onClick={() => setCompareMode(!compareMode)}>
                        {compareMode ? "Stop Comparing" : "Compare With My Stats"}
                    </Button>
                }
            </div>
            <h3 className="m-t-30">{`${username} ${mediaType}'s stats`}</h3>
            <HLine/>
            <MediaListStats
                mediaType={mediaType}
                graphData={apiData.stats}
                compareData={compareData}
            />
        </>

    );
};


export default withPrivateRoute(MediaStatsPage);