import React from "react";
import {Link} from "react-router-dom";
import {Col, Image, Row} from "react-bootstrap";
import {FaExternalLinkAlt} from "react-icons/fa";

import AddTooltip from "../primitives/AddTooltip";
import {capitalize, getStatusColor} from "../../utils/functions";
import MetricDistribution from "./MetricDistribution";
import HLine from "../primitives/HLine";


const MediaStats = ({ user, media }) => (
    <div className="d-flex flex-column gap-4 m-t-15">
        <div>
            <h5 className="d-flex justify-content-between fw-5">
                <div>{capitalize(media.media_type)}</div>
                <div>{parseInt(media.time_days)} days</div>
            </h5>
            <HLine color={`text-${media.media_type}`}/>
            <div className="d-flex flex-wrap justify-content-between text-center fw-5">
                <div>
                    <div className="fs-14 text-gloom">Hours</div>
                    <div>{media.time_hours}</div>
                </div>
                {media.media_type !== "games" &&
                    <div>
                        <div className="fs-14 text-gloom">
                            {media.media_type === "books" && <>Pages</>}
                            {media.media_type === "movies" && <>Watched</>}
                            {["series", "anime"].includes(media.media_type) && <>Episodes</>}
                        </div>
                        <div>{media.specific_total}</div>
                    </div>
                }
                <div>
                    <div className="fs-14 text-gloom">Media</div>
                    <div>{media.total_media}</div>
                </div>
                {!user.add_feeling &&
                    <div>
                        <div className="fs-14 text-gloom">Score</div>
                        <div>{media.mean_metric.toFixed(2)}</div>
                    </div>
                }
                <div>
                    <div className="fs-14 text-gloom">Scored</div>
                    <div>{media.media_metric}/{media.total_media}</div>
                </div>
            </div>
            <div className="block-chart m-t-10 m-b-10">
                {media.no_data ?
                    <span className="block" style={{backgroundColor: "black"}}/>
                    :
                    media.status_count.map(status =>
                        <AddTooltip key={`${status.status}-${media.media_type}`} title={status.status}>
                                <span className="block" style={{
                                    width: `${status.percent}%`,
                                    backgroundColor: getStatusColor(status.status)
                                }}/>
                        </AddTooltip>
                    )
                }
            </div>
            <Row className="fw-5 fs-15 gy-2">
                {media.status_count.map(s =>
                    <React.Fragment key={`${s.status}-${media.media_type}`}>
                        <Col className="col-4 one-line-ellipsis">
                            <Link to={`/list/${media.media_type}/${user.username}?status=${s.status}`}
                                  className="text-gloom fw-5">
                                <div className="colored-bullet" style={{backgroundColor: getStatusColor(s.status)}}/>
                                {s.status}
                            </Link>
                        </Col>
                        <Col className="col-2">{s.count}</Col>
                    </React.Fragment>
                )}
            </Row>
        </div>
        <div>
            <Link className="text-light fw-5 fs-18" to={`/list/${media.media_type}/${user.username}?status=Favorite`}>
                Favorites ({media.total_favorites})
            </Link>
            {media.total_favorites === 0 ?
                <div className="text-grey m-t-15"><i>No favorites added yet</i></div>
                :
                <div className="d-flex flex-wrap justify-content-start gap-2 m-t-5">
                    {media.favorites.map(m =>
                        <Link key={m.media_name} to={`/details/${media.media_type}/${m.media_id}`}>
                            <AddTooltip title={m.media_name}>
                                <Image
                                    id={`${media.media_type}_${m.media_id}`}
                                    style={{borderRadius: 4}}
                                    height={81}
                                    src={m.media_cover}
                                />
                            </AddTooltip>
                        </Link>
                    )}
                </div>
            }
        </div>
        <MetricDistribution
            isFeeling={user.add_feeling}
            metricCount={media.count_per_metric}
            mediaType={media.media_type}
        />
        <div className="fw-5 fs-18">
            <Link className="text-light" to={`/stats/${media.media_type}/${user.username}`}>
                Detailed stats &nbsp;<FaExternalLinkAlt size={16}/>
            </Link>
        </div>
    </div>
);


export default MediaStats