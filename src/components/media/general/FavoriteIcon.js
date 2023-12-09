import React, {useState} from "react";
import {FaHeart, FaRegHeart} from "react-icons/fa";

import LoadingIcon from "../../primitives/LoadingIcon";
import useLoading from "../../../hooks/LoadingHook";
import AddTooltip from "../../primitives/AddTooltip";


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
                <AddTooltip title={"Favorite"} addSpan>
                    <Icon
                        className={isEnabled ? "cu-p" : ""}
                        style={{color: color}}
                        onClick={isEnabled ? handleFavorite : null}
                    />
                </AddTooltip>
            }
        </>
    );
}