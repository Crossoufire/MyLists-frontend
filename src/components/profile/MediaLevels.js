import React, {useState} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";

import {zeroPad, capitalize} from "../../utils/functions";
import HLine from "../primitives/HLine";


function MediaLevelBar({ mediaType, username, levelImage, levelName, level, percent }) {
    return (
        <div className="d-flex gap-3 align-items-center">
            <div>
                <Image
                    id={`img-${mediaType}`}
                    src={levelImage}
                    height={38}
                    width={38}
                    alt={levelName}
                />
                <Tooltip anchorId={`img-${mediaType}`} content={levelName}/>
            </div>
            <div className="w-100">
                <Row>
                    <Col className="col-4">
                        <Link className="text-light" to={`/list/${mediaType}/${username}`}>
                            {capitalize(mediaType)}
                        </Link>
                    </Col>
                    <Col className="col-8"><div>Level {zeroPad(level)}</div></Col>
                </Row>
                <div id={mediaType} className="xp-bar">
                    <div className={`xp-bar-fill bg-${mediaType}`} style={{width: percent+"%"}}/>
                    <Tooltip anchorId={mediaType} content={percent+"%"}/>
                </div>
                <span>&nbsp;&nbsp;{zeroPad(level + 1)}</span>
            </div>
        </div>
    );
}


export default function MediaLevels({ username, mediaLevels }) {
    const [isOpen, setIsOpen] = useState(true);
    const [caret, setCaret] = useState(FaCaretDown);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight);
    };

    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="cu-p" onClick={toggleCollapse}>
                    {caret} List Levels
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <>
                        {mediaLevels.map(data =>
                            <MediaLevelBar
                                key={data.media_type}
                                username={username}
                                mediaType={data.media_type}
                                levelName={data.grade_title}
                                levelImage={data.grade_image}
                                level={data.media_level}
                                percent={data.media_level_percent}
                            />
                        )}
                    </>
                }
            </Card.Body>
        </Card>
    );
}
