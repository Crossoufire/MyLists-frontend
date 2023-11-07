import React, {useState} from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";

import UserUpdate from "../reused/UserUpdate";
import HLine from "../primitives/HLine";


export default function UserUpdates({ username, userUpdates, followers=false }) {
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
                    <div>{caret} &nbsp;{followers ? "Follows Updates" : "Updates"}</div>
                    {!followers &&
                        <div>
                            <Link className="text-grey fs-16" to={"/profile/"+username+"/history"}>
                                <i><u>All</u></i>
                            </Link>
                        </div>
                    }
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <>
                        {userUpdates.length === 0 ?
                            <div className="text-grey"><i>No updates to display</i></div>
                            :
                            userUpdates.map(update =>
                                <UserUpdate
                                    key={update.date}
                                    username={followers && update.username}
                                    mediaType={update.media_type}
                                    mediaId={update.media_id}
                                    mediaName={update.media_name}
                                    payload={update.update}
                                    date_={update.date}
                                />
                            )}
                    </>
                }
            </Card.Body>
        </Card>
    );
}

