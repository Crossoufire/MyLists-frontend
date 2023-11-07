import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaCaretDown, FaCaretRight, FaExternalLinkAlt} from "react-icons/fa";

import HLine from "../primitives/HLine";


export default function ProfileMiscInfo({ user, mediaData }) {
    const [isOpen, setIsOpen] = useState(true);
    const [caret, setCaret] = useState(FaCaretDown);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight)
    }

    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="d-flex justify-content-between cu-p" onClick={toggleCollapse}>
                    <div>{caret} &nbsp;Information</div>
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <div className="m-l-15 w-75">
                        <div>Views</div>
                        <div className="d-flex flex-column m-l-25">
                            <div className="d-flex justify-content-between">
                                <div>Profile</div>
                                <div>{user.profile_views}</div>
                            </div>
                            {mediaData.map((data, idx) =>
                                <div key={idx} className="d-flex justify-content-between">
                                    <div>{`${data.media_name}List`}</div>
                                    <div>{user[`${data.media_type}_views`]}</div>
                                </div>
                            )}
                        </div>

                        <div>Extra data</div>
                        <div className="d-flex flex-column m-l-25">
                            <Link className="text-light" to="/levels/media_levels" target="_blank" rel="noreferrer">
                                <div className="d-flex flex-row justify-content-between">
                                    <div><u>Media levels data</u></div>
                                    <div><FaExternalLinkAlt className="text-grey"/></div>
                                </div>
                            </Link>
                            <Link className="text-light" to="/levels/profile_levels" target="_blank" rel="noreferrer">
                                <div className="d-flex justify-content-between">
                                    <div><u>Profile borders data</u></div>
                                    <div><FaExternalLinkAlt className="text-grey"/></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}
