import React from "react";
import {useParams} from "react-router-dom";

import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import {useUser} from "../providers/UserProvider";
import {useFetchData} from "../hooks/FetchDataHook";
import MediaListStats from "../components/medialist/MediaListStats";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import HLine from "../components/primitives/HLine";
import NavigationMedia from "../components/medialist/NavigationMedia";


const MediaStatsPage = () => {
    const { currentUser } = useUser();
    const { mediaType, username } = useParams();
    const { apiData, error } = useFetchData(`/list/stats/${mediaType}/${username}`);
    const denomination = currentUser.username === username ? "Your" : username;

    if (error) return <ErrorPage error={error}/>
    if (apiData === undefined || mediaType !== apiData.media_type) return <Loading/>;

    return (
        <>
            <div className="d-flex media-navigation gap-4 m-t-35">
                <NavigationMedia
                    userData={apiData.user_data}
                    mediaType={mediaType}
                    path={"list/stats"}
                />
            </div>
            <h3 className="m-t-30">{`${denomination} ${mediaType}'s stats`}</h3>
            <HLine/>
            <MediaListStats
                mediaType={mediaType}
                graphData={apiData.stats}
            />
        </>

    );
};


export default withPrivateRoute(MediaStatsPage);