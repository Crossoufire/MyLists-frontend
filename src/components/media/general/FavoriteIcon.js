import React, {useState} from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {Tooltip} from "react-tooltip";

import LoadingIcon from "../../primitives/LoadingIcon";
import useLoading from "../../../hooks/LoadingHook";


export default function FavoriteIcon({ mediaId, isEnabled=true, initFav, updateFavorite }) {
    const [favorite, setFavorite] = useState(initFav);
    const [isLoading, handleLoading] = useLoading();

    const Icon = favorite ? FaHeart : FaRegHeart;
    const color = favorite && "#cd0303";

    const handleFavorite = async () => {
        const response = await handleLoading(updateFavorite, !favorite);
        if (response) {
            setFavorite(!favorite);
        }
    };

    return (
        <>
            {isLoading ?
                <LoadingIcon loading={true} size={6}/>
                :
                <>
                    <Icon
                        id={"fav-icon-" + mediaId}
                        className={isEnabled ? "cu-p" : ""}
                        style={{color: color}}
                        onClick={isEnabled ? handleFavorite : null}
                    />
                    <Tooltip anchorId={"fav-icon-" + mediaId} content="Favorite" className="fs-15"/>
                </>
            }
        </>
    );
}