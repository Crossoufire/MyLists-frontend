import React from "react";
import {Col, Row, Tab, Tabs} from "react-bootstrap";

import {useFetchData} from "../hooks/FetchDataHook";
import {capitalize} from "../utils/functions";
import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import NextMedia from "../components/comingNext/nextMedia";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";


const ComingNext = () => {
    const { apiData, loading, error } = useFetchData("/coming_next");

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading />;

    return (
        <div id="list-tabs">
            <Tabs defaultActiveKey="series" className="bg-card justify-content-center m-t-40 m-b-20" data-bs-theme="dark">
                {apiData.map(next =>
                    <Tab key={next.media_type} eventKey={next.media_type} title={`${capitalize(next.media_type)} (${next.items.length})`}>
                        <Row className="gy-lg-4 gx-lg-4 g-0">
                            {next.items.length === 0 ?
                                <i className="fs-18 fw-4 text-grey">No coming next for {next.media_type} yet</i>
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
};


export default withPrivateRoute(ComingNext);
