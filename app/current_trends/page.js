"use client";
import {Col, Row, Tab, Tabs} from "react-bootstrap";

import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import TrendItem from "@/stuff/components/trends/TrendItem";
import Loading from "@/stuff/components/primitives/Loading";
import ErrorPage from "../../stuff/pages/ErrorPage";


const Trends = () => {
    const { apiData, loading, error } = useFetchData("/current_trends")

    if (error) return <ErrorPage error={error}/>
    if (loading) return <Loading/>;

    return (
        <div id="trends-tabs">
            <Tabs defaultActiveKey="series" className="bg-card fs-20 m-t-40 m-b-20" data-bs-theme="dark">
                <Tab eventKey="series" title="Trending TV">
                    <Row className="m-b-50 gy-4">
                        {apiData.tv_trends.map((media, idx) =>
                            <Col key={media.api_id} xs={12} sm={6} md={4} lg={4} xl={4}>
                                <TrendItem
                                    media={media}
                                    idx={idx}
                                />
                            </Col>
                        )}
                    </Row>
                </Tab>
                <Tab eventKey="movies" title="Trending Movies">
                    <Row className="m-b-50 gy-4">
                        {apiData.movies_trends.map((media, idx) =>
                            <Col key={media.api_id} xs={12} sm={6} md={6} lg={6} xl={4}>
                                <TrendItem
                                    media={media}
                                    idx={idx}
                                />
                            </Col>
                        )}
                    </Row>
                </Tab>
            </Tabs>
        </div>
    )
};


export default Trends;