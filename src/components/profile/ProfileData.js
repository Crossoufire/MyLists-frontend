import React from "react";
import {Col, Row} from "react-bootstrap";

import MediaLevels from "./MediaLevels";
import UserUpdates from "./UserUpdates";
import ProfileMiscInfo from "./ProfileMiscInfo";
import GlobalStats from "./GlobalStats";
import ProfileFollows from "./ProfileFollows";
import MediaDetails from "./MediaDetails";


const ProfileData = ({ username, apiData }) => (
    <>
        <Row id="profile-info" className="gx-3 m-t-15 m-b-20">
            <Col md={5} lg xl={3}>
                <MediaLevels
                    username={username}
                    mediaLevels={apiData.list_levels}
                />
                <div className="m-t-15"/>
                <UserUpdates
                    username={username}
                    updates={apiData.user_updates}
                    followers={false}
                />
                <div className="m-t-15"/>
                <ProfileMiscInfo
                    user={apiData.user_data}
                    mediaData={apiData.list_levels}
                />
                <div className="m-t-15"/>
            </Col>
            <Col md lg xl>
                <GlobalStats
                    userData={apiData.user_data}
                    global={apiData.media_global}
                />
                <div className="m-t-15"/>
                <MediaDetails
                    userData={apiData.user_data}
                    mediaData={apiData.media_data}
                />
                <div className="m-t-15"/>
            </Col>
            <Col md={5} lg xl={3}>
                <ProfileFollows
                    username={username}
                    follows={apiData.follows}
                />
                <div className="m-t-15"/>
                <UserUpdates
                    username={username}
                    updates={apiData.follows_updates}
                    followers={true}
                />
            </Col>
        </Row>
    </>
);


export default ProfileData;
