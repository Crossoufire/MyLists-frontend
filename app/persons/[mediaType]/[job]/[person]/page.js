"use client";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Card, Col, Image, Row} from "react-bootstrap";

import {useFetchData} from "@/stuff/hooks/FetchDataHook";
import Loading from "@/stuff/components/primitives/Loading";
import Return from "@/stuff/components/primitives/Return";
import HLine from "@/stuff/components/primitives/HLine";
import ErrorPage from "@/stuff/pages/ErrorPage";


const PersonsPage = ({ params }) => {
    const router = useRouter();
    console.log(params);
    const { apiData, loading, error } = useFetchData(`/details/${params.mediaType}/${params.job}/${params.person}`)

    if (error) return <ErrorPage error={error}/>;

    return (
        <>
            <h4 className="m-t-30">{params.person}'s {params.mediaType}</h4>
            <HLine/>
            <div className="m-t-10 cu-p" style={{display: "inline-block"}} onClick={() => router.back()}>
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
                                    <Link className="overlay" href={`/details/${params.mediaType}/${media.id}`}>
                                        <span className="overlay-text text-light fs-24">{media.name}</span>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    )}
            </Row>
        </>
    );
};


export default PersonsPage
