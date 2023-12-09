import React from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

import {zeroPad, capitalize} from "../../utils/functions";
import HLine from "../primitives/HLine";
import AddTooltip from "../primitives/AddTooltip";
import useCollapse from "../../hooks/CollapseHook";


const MediaLevelBar = ({ mediaType, username, rankName, rankImage, level, percent }) => {
    return (
        <div className="d-flex gap-3 align-items-center">
            <AddTooltip title={rankName}>
                <Image
                    src={rankImage}
                    height={38}
                    width={38}
                    alt={rankName}
                />
            </AddTooltip>
            <div className="w-100">
                <Row>
                    <Col className="col-4">
                        <Link className="text-light" to={`/list/${mediaType}/${username}`}>
                            {capitalize(mediaType)}
                        </Link>
                    </Col>
                    <Col className="col-8">
                        <div>Level {zeroPad(level)}</div>
                    </Col>
                </Row>
                <AddTooltip title={`${percent.toFixed(0)}%`}>
                    <div id={mediaType} className="xp-bar">
                        <div className={`xp-bar-fill bg-${mediaType}`} style={{width: `${percent}%`}}/>
                    </div>
                </AddTooltip>
                <span>&nbsp;&nbsp;{zeroPad(level + 1)}</span>
            </div>
        </div>
    );
};


const MediaLevels = ({ username, mediaLevels }) => {
    const { isOpen, caret, toggleCollapse } = useCollapse();

    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="cu-p" onClick={toggleCollapse}>
                    <div>{caret} &nbsp;List Levels</div>
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <>
                        {mediaLevels.map(data =>
                            <MediaLevelBar
                                key={data.media_type}
                                username={username}
                                mediaType={data.media_type}
                                rankName={data.rank_name}
                                rankImage={data.rank_image}
                                level={data.level}
                                percent={data.level_percent}
                            />
                        )}
                    </>
                }
            </Card.Body>
        </Card>
    );
};


export default MediaLevels;

