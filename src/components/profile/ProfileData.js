import React from "react";
import {Col, Row} from "react-bootstrap";

import MediaLevels from "./MediaLevels";
import UserUpdates from "./UserUpdates";
import ProfileMiscInfo from "./ProfileMiscInfo";
import GlobalStats from "./GlobalStats";
import MediaStats from "./MediaStats";
import ProfileFollows from "./ProfileFollows";


export default function ProfileData({ username, apiData }) {
    return (
        <Row className="gx-3 m-t-15 m-b-50">
            <Col md={5} lg xl={3}>
                <MediaLevels
                    username={username}
                    mediaLevels={apiData.media_data}
                />
                <div className="m-t-15"/>
                <UserUpdates
                    username={username}
                    userUpdates={apiData.user_updates}
                    followers={false}
                />
                <div className="m-t-15"/>
                <ProfileMiscInfo
                    user={apiData.user_data}
                    mediaData={apiData.media_data}
                />
                <div className="m-t-15"/>
            </Col>
            <Col md lg xl>
                <GlobalStats
                    userData={apiData.user_data}
                    global={apiData.media_global}
                />
                <div className="m-t-15"/>
                {apiData.media_data.map((data, idx) =>
                    <MediaStats
                        key={idx}
                        user={apiData.user_data}
                        media={data}
                    />
                )}
            </Col>
            <Col md={12} lg xl={3}>
                <ProfileFollows
                    username={username}
                    follows={apiData.follows}
                />
                <div className="m-t-15"></div>
                <UserUpdates
                    username={username}
                    userUpdates={apiData.follows_updates}
                    followers={true}
                />
            </Col>
        </Row>
    );
}
