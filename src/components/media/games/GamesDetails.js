import React from "react";
import {Card, Col, Row} from "react-bootstrap";

import {formatTime} from "../../../utils/functions";
import HLine from "../../primitives/HLine";
import Synopsis from "../general/Synopsis";
import MapDetails from "../general/MapDetails";
import ReleaseDate from "../general/ReleaseDate";
import GenericDetails from "../general/GenericDetails";
import {FaStar} from "react-icons/fa";


export default function GamesDetails({ mediaData, mediaType }) {
    const gameModes = mediaData.game_modes?.split(",") || [];

    return (
        <div className="d-flex flex-column gap-4">
            <Card className="bg-card text-light">
                <Card.Body className="p-3">
                    <Row className="gx-4 details-ul-li">
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <div className="fw-6" style={{color: "#8a8a8a"}}>IGDB Rating</div>
                                    <div>
                                        <FaStar className="m-b-4"/>&nbsp;
                                        {(mediaData.vote_average/10).toFixed(1)} ({mediaData.vote_count})
                                    </div>
                                </li>
                                <li>
                                    <MapDetails
                                        name={"Developers"}
                                        job={"creator"}
                                        mediaType={mediaType}
                                        valueList={mediaData.developers}
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
                                        name={"Perspective"}
                                        value={mediaData.player_perspective}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Engine"}
                                        value={mediaData.game_engine}
                                    />
                                </li>
                                <li>
                                    <MapDetails
                                        name={"Modes"}
                                        valueList={gameModes}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <MapDetails
                                        name={"Genres"}
                                        valueList={mediaData.genres}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl={3}>
                            <ul>
                                <li>
                                    <GenericDetails
                                        name={"HLTB Main"}
                                        value={formatTime(mediaData.hltb_main_time * 60, true)}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"HLTB Extra"}
                                        value={formatTime(mediaData.hltb_main_and_extra_time * 60, true)}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"HLTB Total"}
                                        value={formatTime(mediaData.hltb_total_complete_time * 60, true)}
                                    />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <HLine/>
                    <MapDetails
                        name={"Publishers"}
                        valueList={mediaData.publishers}
                        asJoin={true}
                    />
                    <div className="m-t-15"></div>
                    <MapDetails
                        name={"Platforms"}
                        valueList={mediaData.platforms}
                        asJoin={true}
                    />
                </Card.Body>
            </Card>
            <Synopsis
                synopsis={mediaData.synopsis}
            />
        </div>
    )
}