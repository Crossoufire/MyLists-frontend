import React from "react";
import Link from "next/link";
import {Image} from "react-bootstrap";

import {capitalize} from "@/stuff/utils/functions";


export function MediaSearch({ apiId, name, mediaType, thumbnail, date, resetSearch }) {
    return (
        <Link href={mediaType === "User" ? `/profile/${name}` : `/details/${mediaType}/${apiId}?search=True`}
              onClick={() => resetSearch(true)}>
            <div className="media-search-container">
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
        </Link>
    );
}
