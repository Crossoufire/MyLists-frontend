import React from "react";

import FavoriteIcon from "../media/general/FavoriteIcon";
import MetricListDrop from "./MetricListDrop";
import CommentModal from "./CommentModal";
import RedoListDrop from "./RedoListDrop";


export default function UserMediaInfo({ isCurrent, mediaType, mediaData, userMetric, updateUserAPI }) {
    const rmCorner = mediaType !== "movies" && "rm-round-corner";

    return (
        <div className={"user-media-container " + rmCorner}>
            <div className="d-flex justify-content-around align-items-center h-100 text-light">
                <FavoriteIcon
                    mediaId={mediaData.media_id}
                    isEnabled={isCurrent}
                    initFav={mediaData.favorite}
                    updateFavorite={updateUserAPI.favorite}
                />
                <MetricListDrop
                    mediaId={mediaData.media_id}
                    isEnabled={isCurrent}
                    name={userMetric.name}
                    initMetric={userMetric.value}
                    updateMetric={updateUserAPI.metric}
                />
                <CommentModal
                    isCurrent={isCurrent}
                    mediaName={mediaData.media_name}
                    initContent={mediaData.comment}
                    updateComment={updateUserAPI.comment}
                />
                {(mediaData.status === "Completed" && mediaType !== "games") &&
                    <RedoListDrop
                        mediaId={mediaData.media_id}
                        isEnabled={isCurrent}
                        initRedo={mediaData.rewatched}
                        updateRedo={updateUserAPI.redo}
                    />
                }
            </div>
        </div>
    );
}
