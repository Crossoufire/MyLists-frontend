import React from "react";
import {Card, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

import {zeroPad} from "../../utils/functions";


export default function NextMedia({ mediaType, media }) {
    const rmCorner = mediaType !== "movies" && "rm-round-corner";

    return (
        <>
            <Card className="bg-transparent border-0">
                <div className="overlay-container">
                    <Image
                        className={"medialist-img " + rmCorner}
                        src={media.media_cover}
                        height={300}
                        width={200}
                        style={{height: "auto"}}
                        alt={media.name}
                    />
                    <Link className="overlay" to={`/details/${mediaType}/${media.id}`}>
                        <span className="overlay-text text-light fs-24">{media.name}</span>
                    </Link>
                </div>
                {(mediaType === "anime" || mediaType === "series") &&
                    <div className="text-center user-media-container rm-round-corner">
                        S{zeroPad(media.season_to_air)}&nbsp;-&nbsp;E{zeroPad(media.episode_to_air)}
                    </div>
                }
            </Card>
            <div className="supp-drop-container">{media.date}</div>
        </>
    )
}