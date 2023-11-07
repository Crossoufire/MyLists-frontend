import React from "react";

import PlaytimeDrop from "./PlaytimeDrop";
import PagesInput from "./PagesInput";
import EpsAndSeasons from "./EpsAndSeasons";


export default function SuppMediaInfo({ isCurrent, mediaType, mediaData, updateUserAPI }) {
    if (mediaType === "series" || mediaType === "anime") {
        return (
            <EpsAndSeasons
                isEnabled={isCurrent}
                initSeason={mediaData.current_season}
                initEpisode={mediaData.last_episode_watched}
                epsPerSeason={mediaData.eps_per_season}
                updateSeas={updateUserAPI.season}
                updateEps={updateUserAPI.episode}
            />
        );
    }

    if (mediaType === "games") {
        return (
            <PlaytimeDrop
                isEnabled={isCurrent}
                initPlaytime={mediaData.playtime}
                updatePlaytime={updateUserAPI.playtime}
            />
        );
    }

    if (mediaType === "books") {
        return (
            <PagesInput
                isEnabled={isCurrent}
                initPage={mediaData.actual_page}
                totalPages={mediaData.total}
                updatePage={updateUserAPI.page}
            />
        );
    }
}
