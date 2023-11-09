import React, {useState} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaAlignJustify, FaCommentAlt, FaHeart, FaRedoAlt, FaRegCommentAlt, FaRegHeart, FaStar} from "react-icons/fa";

import {getMetricValues} from "../../../utils/functions";
import MoreFollowDetails from "./MoreFollowDetails";
import HLine from "../../primitives/HLine";


export default function FollowCard({ follow, mediaType }) {
    const [toggleComment, setToggleComment] = useState(false);

    return (
        <Card className="bg-card text-light" style={{width: 320}}>
            <Card.Body className="p-3">
                <Card.Title>
                    <Row className="gx-0">
                        <Col className="col-3">
                            <Link to={`/profile/${follow.username}`}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Image
                                        roundedCircle
                                        className="follow-img"
                                        src={follow.profile_image}
                                        alt={follow.username}
                                    />
                                </div>
                            </Link>
                        </Col>
                        <Col className="m-l-12">
                            <Link to={`/profile/${follow.username}`} className="text-light">
                                <h5 style={{marginTop: "-6px"}}>{follow.username}</h5>
                            </Link>
                            <div className="d-flex flex-row justify-content-between">
                                <div>
                                    <FaStar size={15} className="m-b-4"/>&nbsp;
                                    {follow.add_feeling ?
                                        (follow.feeling === -1 || follow.feeling === null) ?
                                            <>---</>
                                            :
                                            <>{getMetricValues("Feeling").slice(1)[follow.feeling].icon}</>
                                        :
                                        (follow.score === -1 || follow.score === null) ?
                                            <>---</>
                                            :
                                            <>{follow.score}</>
                                    }
                                </div>
                                {(follow.status === "Completed" && mediaType !== "games") &&
                                    <div><FaRedoAlt size={15} className="m-b-3"/> {follow.rewatched}</div>
                                }
                                <div>
                                    {follow.comment ?
                                        <Link to={"#"} onClick={() => setToggleComment(!toggleComment)}>
                                            <FaCommentAlt
                                                size={15}
                                                className="m-b-3"
                                                style={{color: "goldenrod"}}
                                            />
                                        </Link>
                                        :
                                        <FaRegCommentAlt size={15} className="m-b-3"/>
                                    }
                                </div>
                                <div>
                                    {follow.favorite ?
                                        <FaHeart size={15} color="red" className="m-b-3"/>
                                        :
                                        <FaRegHeart size={15} className="m-b-3"/>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Title>
                <HLine/>
                <div className="fw-5">
                    <div><FaAlignJustify/> &nbsp;{follow.status}</div>
                    <MoreFollowDetails
                        mediaType={mediaType}
                        follow={follow}
                    />
                </div>
            </Card.Body>
            {toggleComment &&
                <Card.Footer>
                    <i className="text-grey">{follow.comment}</i>
                </Card.Footer>}
        </Card>
    );
}