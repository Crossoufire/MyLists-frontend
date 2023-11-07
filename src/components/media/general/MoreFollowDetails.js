import React from "react";
import {FaPlay} from "react-icons/fa";


export default function MoreFollowDetails({ mediaType, follow }) {
    if (mediaType === "series" || mediaType === "anime") {
        if (!["Random", "Plan to Watch"].includes(follow.status)) {
            return <><FaPlay/> &nbsp;Season: {follow.current_season} - Episode: {follow.last_episode_watched}</>;
        }
    }
    else if (mediaType === "books") {
        if (follow.status !== "Plan to Read") {
            return <><FaPlay/> &nbsp;Page: {follow.page}</>;
        }
    }
    else if (mediaType === "games") {
        if (follow.status !== "Plan to Play") {
            return <><FaPlay/> &nbsp;Playtime: {follow.playtime/60} h</>;
        }
    }
}
