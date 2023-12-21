"use client";
import React, {useState} from "react";
import Link from "next/link";
import {FaUserMinus, FaUserPlus} from "react-icons/fa";

import {useApi} from "@/stuff/providers/ApiProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";
import LoadingIcon from "../primitives/LoadingIcon";
import useLoading from "@/stuff/hooks/LoadingHook";
import AddTooltip from "../primitives/AddTooltip";


export default function FollowIcon({ initFollow, followId }) {
    const api = useApi();
    const flash = useFlash();
    const [isLoading, handleLoading] = useLoading();
    const [isFollowing, setFollowing] = useState(initFollow);

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
                <Link href={"#"} onClick={handleFollow}>
                    <AddTooltip title={content} addSpan>
                        <FaIcon style={{color: color}}/>
                    </AddTooltip>
                </Link>
            }
        </>
    )
}
