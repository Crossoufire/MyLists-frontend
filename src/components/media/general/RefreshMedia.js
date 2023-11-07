import React from "react";
import {FaRedo} from "react-icons/fa";
import {Link} from "react-router-dom";

import LoadingIcon from "../../primitives/LoadingIcon";
import {useLoading} from "../../../hooks/LoadingHook";


export default function RefreshMedia({ updateRefresh, callbackRefresh }) {
    const [isLoading, handleLoading] = useLoading();

    const handleRefresh = async () => {
        const response = await handleLoading(updateRefresh);
        if (response) {
            callbackRefresh();
        }
    };

    return <>
        {isLoading ?
            <LoadingIcon size={8} cssOverride={{marginTop: 16}}/>
            :
            <Link to={"#"} className="text-grey" onClick={handleRefresh}>
                <FaRedo size={20}/>
            </Link>
        }
    </>;
}
