import React from "react";
import {useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";

import {useApi} from "../../contexts/ApiProvider";
import {useFlash} from "../../contexts/FlashProvider";
import {capitalize} from "../../utils/functions";


export function MediaSearch({ apiId, name, mediaType, thumbnail, date, resetSearch }) {
    const api = useApi();
    const flash = useFlash();
    const navigate = useNavigate();

    async function handleOnClick() {
        if (mediaType === "User") {
            resetSearch();
            return navigate(`/profile/${name}`);
        }

        const response = await api.post(`/add_media_to_db/${mediaType}/${apiId}`);

        resetSearch();

        if (!response.ok) {
            return flash(response.body.message, "danger");
        }

        navigate(`/details/${mediaType}/${response.body.media_id}`);
    }

    return (
        <div className="media-search-container cu-p" onClick={handleOnClick}>
            <Image
                src={thumbnail}
                style={{borderRadius: 5}}
                height={mediaType === "User" ? 67 : 100}
                width={67}
                alt={name}
            />
            <div className="info-search-container text-light m-l-15">
                <div className="m-b-12"><b>{name}</b></div>
                <div className="text-grey">{capitalize(mediaType)}</div>
                <div className="text-grey">{date}</div>
            </div>
        </div>
    );
}
