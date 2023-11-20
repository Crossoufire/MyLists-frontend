import React from "react";
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {Image} from "react-bootstrap";
import {FaPen} from "react-icons/fa";

import {useUser} from "../../contexts/UserProvider";
import FollowIcon from "./FollowIcon";


export default function ProfileHeader({ user, initFollow, followId }) {
    const { currentUser } = useUser();
    const isCurrent = currentUser.id === user.id;

    return (
        <div className="profile-header-back-container" style={{backgroundImage: `url(${user.back_image})`}}>
            {isCurrent &&
                <Link id="background-picture" className="profile-header-back-pen" to={"/settings"}>
                    <FaPen size="20"/>
                    <Tooltip anchorId="background-picture" content="Change background image" place="bottom"/>
                </Link>
            }
            <div className="profile-header-container">
                {isCurrent ?
                    <>
                        <Link to={"/settings"}>
                            <Image
                                id="profile-picture"
                                className="profile-header-img profile-header-hover"
                                src={user.profile_image}
                                alt="profile-picture"
                            />
                        </Link>
                        <Tooltip
                            anchorId="profile-picture"
                            style={{zIndex: 1}}
                            content="Change profile image"
                        />
                    </>
                    :
                    <Image
                        className="profile-header-img"
                        src={user.profile_image}
                        alt="profile-picture"
                    />
                }
                <Image
                    className="profile-header-frame"
                    src={user.profile_border}
                    alt="profile-header-frame"
                />
                <div className="profile-header-level">{user.profile_level}</div>
            </div>
            <div className="profile-header-data">
                <h2 className="d-flex gap-3 profile-header-shadow align-items-end">
                    {user.username}
                    {!isCurrent &&
                        <FollowIcon
                            initFollow={initFollow}
                            followId={followId}
                        />
                    }
                </h2>
                <div className="profile-header-shadow fw-6">
                    <div>Joined: {user.registered_on}</div>
                    <Link className="text-light" to={`/profile/${user.username}/followers`}>
                        <div>Followers: {user.followers_count}</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
