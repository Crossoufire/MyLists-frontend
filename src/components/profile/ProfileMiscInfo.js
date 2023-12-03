import React from "react";
import {Card} from "react-bootstrap";

import {capitalize} from "../../utils/functions";
import HLine from "../primitives/HLine";
import useCollapse from "../../hooks/CollapseHook";


export default function ProfileMiscInfo({ user, mediaData }) {
    const { isOpen, caret, toggleCollapse } = useCollapse();

    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="d-flex justify-content-between cu-p" onClick={toggleCollapse}>
                    <div>{caret} &nbsp;Information</div>
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <div style={{width: "85%"}}>
                        <div className="d-flex flex-column m-l-30">
                            <div className="d-flex justify-content-between">
                                <div>Profile views</div>
                                <div>{user.profile_views}</div>
                            </div>
                            {mediaData.map(data =>
                                <div key={data.media_type} className="d-flex justify-content-between">
                                    <div>{`${capitalize(data.media_type)}List`} views</div>
                                    <div>{user[`${data.media_type}_views`]}</div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </Card.Body>
        </Card>
    );
}
