import React from "react";
import {Row} from "react-bootstrap";

import MediaItem from "./MediaItem";
import Loading from "../primitives/Loading";
import CustomPagination from "../primitives/CustomPagination";


export default function MediaListData({ loading, apiData, mediaType, isCurrent, updatePagination }) {
    if (loading) return <Loading addStyle="text-center"/>;

    return (
        <>
            <Row className="gy-lg-4 gx-lg-4 g-0 m-b-30">
                {apiData.media_data.media_list.map(media =>
                    <MediaItem
                        key={media.media_id}
                        isCurrent={isCurrent}
                        mediaType={mediaType}
                        userData={apiData.user_data}
                        mediaData={media}
                        isCommon={apiData.media_data.common_ids.includes(media.media_id)}
                        activeStatus={apiData.pagination.status}
                    />
                )}
            </Row>
            <CustomPagination
                currentPage={apiData.pagination.page}
                totalPages={apiData.pagination.pages}
                onChangePage={updatePagination}
            />
        </>
    );
}