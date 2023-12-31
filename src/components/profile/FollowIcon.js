import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FaUserMinus, FaUserPlus} from "react-icons/fa";

import LoadingIcon from "../primitives/LoadingIcon";
import useLoading from "../../hooks/LoadingHook";
import {useApi} from "../../providers/ApiProvider";
import {useFlash} from "../../providers/FlashProvider";
import AddTooltip from "../primitives/AddTooltip";


export default function FollowIcon({ initFollow, followId }) {
    const api = useApi();
    const flash = useFlash();
    const [isFollowing, setFollowing] = useState(initFollow);
    const [isLoading, handleLoading] = useLoading();
    const content = isFollowing ? "Unfollow" : "Add follow";
    const color = isFollowing ? "indianred" : "cadetblue";
    const FaIcon = isFollowing ? FaUserMinus : FaUserPlus;

    const updateFollow = async (followId, followValue) => {
        const response = await api.post("/update_follow", {
            follow_id: followId,
            follow_status: followValue,
        });

        if (!response.ok) {
            flash("Sorry the follow could not be update. Please try again later.", "warning");
            return false;
        }

        return true;
    }
    const handleFollow = async () => {
        const response = await handleLoading(updateFollow, followId, !isFollowing);
        if (response) {
            setFollowing(!isFollowing);
        }
    };


    return (
        <>
            {isLoading ?
                <LoadingIcon loading={true} size={10} cssOverride={{marginBottom: 10}}/>
                :
                <Link to={"#"} onClick={handleFollow}>
                    <AddTooltip title={content} addSpan>
                        <FaIcon style={{color: color}}/>
                    </AddTooltip>
                </Link>
            }
        </>
    )
}
