import {Tooltip} from "react-tooltip";
import {Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";


export default function VersoMediaCard({ user, media }) {
    return (
        <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-wrap justify-content-between text-center fw-5">
                <div>
                    <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>Hours</div>
                    <div>{media.time_hours}</div>
                </div>
                {media.media_type !== "games" &&
                    <div>
                        <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>
                            {media.media_type === "books" && <>Pages</>}
                            {media.media_type === "movies" && <>Watched</>}
                            {(media.media_type === "series" || media.media_type === "anime") && <>Episodes</>}
                        </div>
                        <div>{media.specific_total}</div>
                    </div>
                }
                <div>
                    <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>Media</div>
                    <div>{media.total_media}</div>
                </div>
                {!user.add_feeling &&
                    <div>
                        <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>Score</div>
                        <div>{media.mean_metric.toFixed(2)}</div>
                    </div>
                }
                <div>
                    <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>Scored</div>
                    <div>{media.media_metric}/{media.total_media}</div>
                </div>
            </div>
            <div>
                {media.no_data ?
                    <span className="block-no-data w-100"/>
                    :
                    media.status_count.map(status =>
                        <React.Fragment key={`${status.status}_${media.media_name}`}>
                            <span id={`${status.status}_${media.media_name}`} className="block" style={{width: `${status.percent}%`}}/>
                            <Tooltip anchorId={`${status.status}_${media.media_name}`} content={status.status}/>
                        </React.Fragment>
                    )
                }
            </div>
            <Row className="fw-5">
                {media.status_count.map(status =>
                    <React.Fragment key={`${status.status}_${media.media_type}`}>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Link className="text-light fw-5" to={`/list/${media.media_type}/${user.username}?status=${status.status}`}>
                                <div className="fs-14" style={{color: "rgb(138, 138, 138)"}}>{status.status}</div>
                            </Link>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                            <div>{status.count}</div>
                        </Col>
                    </React.Fragment>
                )}
            </Row>
            <div className="fw-5">
                {media.total_favorites > 0 &&
                    <>
                        <Link className="text-light" to={`/list/${media.media_type}/${user.username}?status=Favorite`}>
                            Favorites ({media.total_favorites})
                        </Link>
                        <div className="d-flex flex-wrap justify-content-start gap-2 m-t-5">
                            {media.favorites.map(m =>
                                <Link key={m.media_name} to={`/details/${media.media_type}/${m.media_id}`}>
                                    <Image
                                        id={`${media.media_type}_${m.media_id}`}
                                        rounded
                                        width="auto"
                                        height={81}
                                        src={m.media_cover}
                                    />
                                    <Tooltip
                                        anchorId={`${media.media_type}_${m.media_id}`}
                                        content={m.media_name}
                                    />
                                </Link>
                            )}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
