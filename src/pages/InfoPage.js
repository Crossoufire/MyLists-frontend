import React, {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Card, Col, Image, Row} from "react-bootstrap";

import {withPrivateRoute} from "../components/HigherOrderComp/hocs";
import {useFetchData} from "../hooks/FetchDataHook";
import Loading from "../components/primitives/Loading";
import Return from "../components/primitives/Return";
import HLine from "../components/primitives/HLine";
import ErrorPage from "./ErrorPage";
import CustomPagination from "../components/primitives/CustomPagination";


const InfoPage = () => {
    const mediaPerPage = 36;
    const navigate = useNavigate();
    const { mediaType, job, info } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { apiData, loading, error } = useFetchData(`/details/${mediaType}/${job}/${info}`)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    if (error) return <ErrorPage error={error}/>;
    if (loading) return <Loading/>;

    const totalPages = Math.ceil(apiData.total / mediaPerPage);
    const startIndex = (currentPage - 1) * mediaPerPage;
    const endIndex = startIndex + mediaPerPage;
    const currentItems = apiData.data.slice(startIndex, endIndex);

    return (
        <>
            <h4 className="m-t-30">
                <span>{info}'s {mediaType} ({apiData.total})</span>
            </h4>
            <HLine/>
            <div className="m-t-5 m-b-20 cu-p" style={{display: "inline-block"}} onClick={() => navigate(-1)}>
                <Return value={"to details"}/>
            </div>
            <Row className="gy-lg-4 gx-lg-4 g-0 m-b-50">
                {currentItems.map(media =>
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
                                    <span className="overlay-text text-light fs-24">
                                        {media.name}
                                    </span>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={handlePageChange}
            />
        </>
    );
};


export default withPrivateRoute(InfoPage);
