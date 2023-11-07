import React from "react";
import {Link} from "react-router-dom";

import {createLocalDate, getMediaIcon} from "../../utils/functions";
import Payload from "../primitives/Payload";


export default function UserUpdate({ mediaId, username, mediaType, mediaName, payload, date_ }) {
    return (
        <div className="d-flex user-update-box gap-3">
            <div className="m-t-2">{getMediaIcon(mediaType)}</div>
            <div>
                <Link className="text-light" to={`/details/${mediaType}/${mediaId}`}>
                    <div className="one-line-ellipsis" style={{maxWidth: "100%"}}>{mediaName}</div>
                </Link>
                <div className="fs-15">
                    <Payload payload={payload}/>
                </div>
                <span className="user-update-date">
                    {createLocalDate(date_)}
                    {username && <>&nbsp;by <Link to={`/profile/${username}`}>{username}</Link></>}
                </span>
            </div>
        </div>
    );
}

