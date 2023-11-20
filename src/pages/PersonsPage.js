import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Card, Col, Image, Row} from "react-bootstrap";

import {useFetchData} from "../hooks/FetchDataHook";
import Loading from "../components/primitives/Loading";
import Return from "../components/primitives/Return";
import HLine from "../components/primitives/HLine";
import ErrorPage from "./ErrorPage";


export default function PersonsPage() {
    const navigate = useNavigate();
    const { mediaType, job, person } = useParams();
    const { apiData, loading, error } = useFetchData(`/details/${mediaType}/${job}/${person}`)

    if (error) return <ErrorPage error={error}/>;

    return (
        <>
            <h4 className="m-t-30">{person}'s {mediaType}</h4>
            <HLine/>
            <div className="m-t-10 cu-p" style={{display: "inline-block"}} onClick={() => navigate(-1)}>
                <Return value={"to details"}/>
            </div>
            <Row className="gy-lg-4 gx-lg-4 g-0 m-t-10 m-b-50">
                {loading ?
                    <Loading/>
                    :
                    apiData.map(media =>
                        <Col xs={4} sm={3} md={3} lg={2} xl={2}>
                            <Card className="bg-transparent border-0">
                                <div className="overlay-container">
                                    <Image
                                        className="medialist-img"
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
                            </Card>
                        </Col>
                    )}
            </Row>
        </>
    );
}
