import React from "react";
import {Card, Col, Row} from "react-bootstrap";

import {formatTime} from "../../../utils/functions";
import Synopsis from "../general/Synopsis";
import MapDetails from "../general/MapDetails";
import ReleaseDate from "../general/ReleaseDate";
import GenericDetails from "../general/GenericDetails";


export default function BooksDetails({ mediaData, mediaType }) {
    return (
        <div className="d-flex flex-column gap-4">
            <Card className="bg-card text-light">
                <Card.Body className="p-3">
                    <Row className="gx-0 details-ul-li" style={{marginBottom: "-15px"}}>
                        <Col xs={6} md={6} xl>
                            <ul>
                                <li>
                                    <MapDetails
                                        name={"Authors"}
                                        job={"creator"}
                                        mediaType={mediaType}
                                        valueList={mediaData.authors}
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
                        <Col xs={6} md={6} xl>
                            <ul>
                                <li>
                                    <GenericDetails
                                        name={"Publishers"}
                                        value={mediaData.publishers}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Language"}
                                        value={mediaData.language}
                                    />
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6} md={6} xl>
                            <ul>
                                <li>
                                    <GenericDetails
                                        name={"Pages"}
                                        value={mediaData.pages}
                                    />
                                </li>
                                <li>
                                    <GenericDetails
                                        name={"Completion"}
                                        value={formatTime(mediaData.pages * 1.7) + " min"}
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
                    </Row>
                </Card.Body>
            </Card>
            <Synopsis
                synopsis={mediaData.synopsis}
            />
        </div>
    )
}