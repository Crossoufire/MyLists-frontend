import React from "react";
import {FaRedo} from "react-icons/fa";
import {Link} from "react-router-dom";
import {Tooltip} from "react-tooltip";

import useLoading from "../../../hooks/LoadingHook";
import LoadingIcon from "../../primitives/LoadingIcon";


export default function RefreshMedia({ updateRefresh, reloadPage }) {
    const [isLoading, handleLoading] = useLoading();

    const handleRefresh = async () => {
        const response = await handleLoading(updateRefresh);
        if (response) {
            await reloadPage();
        }
    };

    return (
        <>
            {isLoading ?
                <LoadingIcon size={8} cssOverride={{marginTop: 16}}/>
                :
                <>
                    <Link id={"media-refresher"} to={"#"} className="text-grey" onClick={handleRefresh}>
                        <FaRedo size={20}/>
                    </Link>
                    <Tooltip
                        className="fs-16"
                        style={{zIndex: 5}}
                        anchorId={"media-refresher"}
                        content={"Refresh media"}
                        place={"bottom"}
                    />
                </>

            }
        </>
    );
}
