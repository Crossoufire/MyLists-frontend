import React from "react";
import {FaRedo} from "react-icons/fa";
import {Link} from "react-router-dom";

import useLoading from "../../../hooks/LoadingHook";
import LoadingIcon from "../../primitives/LoadingIcon";
import AddTooltip from "../../primitives/AddTooltip";
import {useFlash} from "../../../contexts/FlashProvider";


export default function RefreshMedia({ updateRefresh, reloadByMutate }) {
    const [isLoading, handleLoading] = useLoading();
    const flash = useFlash();

    const handleRefresh = async () => {
        const response = await handleLoading(updateRefresh);
        if (response) {
            await reloadByMutate();
            flash("Media data successfully updated!", "success");
        }
    };

    return (
        <>
            {isLoading ?
                <LoadingIcon size={8} cssOverride={{marginTop: 16}}/>
                :
                <AddTooltip title={"Refresh media"}>
                    <Link to="#" className="text-grey" onClick={handleRefresh}>
                        <FaRedo size={20}/>
                    </Link>
                </AddTooltip>
            }
        </>
    );
}
