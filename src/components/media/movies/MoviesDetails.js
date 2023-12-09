import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

import {formatTime} from "../../../utils/functions";
import Synopsis from "../general/Synopsis";
import MapDetails from "../general/MapDetails";
import ReleaseDate from "../general/ReleaseDate";
import GenericDetails from "../general/GenericDetails";


const MoviesDetails = ({ mediaType, mediaData }) => (
    <div className="d-flex flex-column gap-4">
        <Card className="bg-card text-light">
            <Card.Body>
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
                                    name={"Director"}
                                    job={"creator"}
                                    mediaType={mediaType}
                                    valueList={[mediaData.director_name]}
                                />
                            </li>
                            <li>
                                <ReleaseDate
                                    name={"Release date"}
                                    start={mediaData.formated_date}
                                />
                            </li>
                        </ul>
                    </Col>
                    <Col xs={6} md={6} xl={3}>
                        <ul>
                            <li>
                                <GenericDetails
                                    name={"Runtime"}
                                    value={formatTime(mediaData.duration) + " min"}
                                />
                            </li>
                            <li>
                                <GenericDetails
                                    name={"Budget"}
                                    value={parseFloat(mediaData.budget) === 0 ? "--" :
                                        `${parseFloat(mediaData.budget).toLocaleString("fr")} $`}
                                />
                            </li>
                            <li>
                                <GenericDetails
                                    name={"Revenue"}
                                    value={parseFloat(mediaData.revenue) === 0 ? "--" :
                                        `${parseFloat(mediaData.revenue).toLocaleString("fr")} $`}
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
                        </ul>
                    </Col>
                    <Col xs={6} md={6} xl={3}>
                        <ul>
                            <li>
                                <GenericDetails
                                    name={"Origin"}
                                    value={mediaData.original_language.toUpperCase()}
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
            tagLine={mediaData.tagline}
        />
    </div>
);


export default MoviesDetails;