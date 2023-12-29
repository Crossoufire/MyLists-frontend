import React from "react";
import {Form} from "react-bootstrap";


const CommonMedia = ({ mediaType, apiData, showCommon, updateCommon }) => {
    return (
        <div className="d-flex gap-3 common-navigation">
            <div>{apiData.media_data.common_ids.length}/{apiData.media_data.total_media} common {mediaType}</div>
            <Form.Switch
                type="switch"
                label="Hide common"
                value={showCommon}
                onChange={updateCommon}
            />
        </div>
    );
}

export default CommonMedia;