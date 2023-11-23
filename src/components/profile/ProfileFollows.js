import React, {useState} from "react";
import {Card, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";

import HLine from "../primitives/HLine";
import AddTooltip from "../primitives/AddTooltip";


export default function ProfileFollows({ username, follows }) {
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
                    <div>{caret} &nbsp;Follows</div>
                    {follows.length !== 0 &&
                        <div>
                            <Link className="text-grey fs-15" to={"/profile/"+username+"/follows"}>
                                <i><u>All ({follows.length})</u></i>
                            </Link>
                        </div>
                    }
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <div className="d-flex justify-content-start flex-wrap gap-3">
                        {follows.length === 0 ?
                            <div className="text-grey"><i>No follows to display</i></div>
                            :
                            follows.map(follow =>
                                <Link key={follow.username} to={"/profile/"+follow.username}>
                                    <AddTooltip title={follow.username}>
                                        <Image
                                            roundedCircle
                                            height={55}
                                            width={55}
                                            style={{backgroundColor: "grey"}}
                                            src={follow.profile_image}
                                            alt={follow.username}
                                        />
                                    </AddTooltip>
                                </Link>
                            )}
                    </div>
                }
            </Card.Body>
        </Card>
    );
}

