import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Tooltip} from "react-tooltip";
import {FaCaretDown, FaCaretRight, FaChevronRight} from "react-icons/fa";

import HLine from "../primitives/HLine";
import VersoMediaCard from "./VersoMediaCard";
import RectoMediaCard from "./RectoMediaCard";


export default function MediaStats({ user, media }) {
    const [caret, setCaret] = useState(FaCaretDown);
    const [verso, setVerso] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight);
    }
    const toggleVerso = () => setVerso(!verso);


    return (
        <Card className="bg-card mb-3 text-light">
            <Card.Body className="p-3">
                <Card.Title>
                    <h5 className="d-flex justify-content-between fw-5">
                        <div className="cu-p" onClick={toggleCollapse}>{caret} &nbsp;{media.media_name}</div>
                        <div>
                            {parseInt(media.time_days)} days

                            {Math.max(...media.count_per_metric) !== 0 &&
                                <>
                                    &nbsp;&nbsp;|&nbsp;
                                    <FaChevronRight
                                        id={"verso-" + media.media_type}
                                        className={"cu-p text-" + media.media_type}
                                        onClick={toggleVerso}
                                    />
                                </>
                            }
                            <Tooltip
                                style={{zIndex: 5}}
                                anchorId={"verso-" + media.media_type}
                                content={"Flip Card"}
                            />
                        </div>
                    </h5>
                </Card.Title>
                <HLine color={"text-"+media.media_type}/>
                {isOpen &&
                    <>
                        {verso ?
                            <VersoMediaCard
                                user={user}
                                media={media}
                            />
                            :
                            <RectoMediaCard
                                feeling={user.add_feeling}
                                metric={media.count_per_metric}
                                mediaType={media.media_type}
                            />
                        }
                    </>
                }
            </Card.Body>
        </Card>
    );
}
