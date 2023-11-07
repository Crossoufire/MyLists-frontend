import React from "react";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import {Tooltip} from "react-tooltip";

import HLine from "../../primitives/HLine";


export default function SimilarMedia({ mediaType, similarMedia }) {
    return (
        <div className="m-t-30">
            <h4>Similar {mediaType}</h4>
            <HLine/>
            <div className="d-flex justify-content-start flex-wrap gap-2">
                {similarMedia.map(media =>
                    <Link key={media.media_id} to={`/details/${mediaType}/${media.media_id}`}>
                        <Image
                            id={media.media_id}
                            src={media.media_cover}
                            height={163}
                            style={{borderRadius: "5px"}}
                            alt={media.name}
                        />
                        <Tooltip anchorId={media.media_id} content={media.name}/>
                    </Link>
                )}
            </div>
        </div>
    )
}
