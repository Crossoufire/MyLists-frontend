import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

import {formatTime} from "../../../utils/functions";
import Synopsis from "../general/Synopsis";
import MapDetails from "../general/MapDetails";
import ReleaseDate from "../general/ReleaseDate";
import GenericDetails from "../general/GenericDetails";
import EpsPerSeason from "./EpsPerSeason";


export default function TVDetails({ mediaData, mediaType }) {
    const creators = mediaData.created_by?.split(", ") || [];

    return (
        <div className="d-flex flex-column gap-4">
            <Card className="bg-card">
                <Card.Body className="p-3 text-light">
                    <Row className="gx-0 details-ul-li" style={{marginBottom: -15}}>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <div className="fw-6" style={{color: "#8a8a8a"}}>TMDB Rating</div>
                                    <div>
                                        <FaStar className="m-b-4"/>&nbsp;
                                        {mediaData.vote_average.toFixed(1)} ({mediaData.vote_count})
                                    </div>
                                </li>
                                <li>
                                    <MapDetails
                                        name={"Created by"}
                                        job={"creator"}
                                        mediaType={mediaType}
                                        valueList={creators}
                                    />
                                </li>
                                <li>
                                    <ReleaseDate
                                        name={"Airing dates"}
                                        start={mediaData.formated_date[0]}
                                        end={mediaData.formated_date[1]}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Prod. Status"}
                                        value={mediaData.status}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <GenericDetails
                                        name={"Eps. duration"}
                                        value={`${mediaData.duration} min`}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Seasons"}
                                        value={`${mediaData.total_seasons} seasons`}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Episodes"}
                                        value={`${mediaData.total_episodes} episodes`}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Completion"}
                                        value={formatTime(mediaData.total_episodes * mediaData.duration)}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <MapDetails
                                        name={"Actors"}
                                        job={"actor"}
                                        mediaType={mediaType}
                                        valueList={mediaData.actors}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Origin"}
                                        value={mediaData.origin_country}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <MapDetails
                                        name={"Networks"}
                                        job={"network"}
                                        mediaType={mediaType}
                                        valueList={mediaData.networks}
                                    />
                                </li>
                                <li>
                                    <MapDetails
                                        name={"Genres"}
                                        valueList={mediaData.genres}
                                    />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Synopsis
                synopsis={mediaData.synopsis}
            />
            <EpsPerSeason
                epsPerSeason={mediaData.eps_per_season}
                epsDuration={mediaData.duration}
            />
        </div>
    )
}