import React from "react";
import {Col, Row, Tab, Image, Tabs, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

import {useFetchData} from "../hooks/FetchDataHook";
import {capitalize, zeroPad} from "../utils/functions";
import Loading from "../components/primitives/Loading";
import ErrorPage from "./ErrorPage";


function NextMedia({ mediaType, media }) {
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


export default function ComingNext() {
    const { apiData, loading, error } = useFetchData("/coming_next")

    if (error?.status) {
        return <ErrorPage {...error}/>
    }

    if (loading) {
        return <Loading/>;
    }


    return (
        <div id="list-tabs">
            <Tabs defaultActiveKey="series" className="bg-card m-t-40 m-b-20 justify-content-center" data-bs-theme="dark">
                {apiData.map(next =>
                    <Tab key={next.media_type} eventKey={next.media_type} title={`${capitalize(next.media_type)} (${next.items.length})`}>
                        <Row className="gy-lg-4 gx-lg-4 g-0">
                            {next.items.length === 0 ?
                                <i className="fs-18 fw-4">No coming next for {next.media_type}.</i>
                                :
                                next.items.map(media =>
                                    <Col key={media.id} xs={4} sm={3} md={3} lg={2} xl={2}>
                                        <NextMedia
                                            mediaType={next.media_type}
                                            media={media}
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                    </Tab>
                )}
            </Tabs>
        </div>

    )
}
