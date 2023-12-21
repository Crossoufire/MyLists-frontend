import React, {useRef, useState} from "react";
import {FaBars, FaTrash} from "react-icons/fa";

import {useOnClickOutside} from "@/stuff/hooks/ClickedOutsideHook";
import AddTooltip from "../primitives/AddTooltip";


const StatusAndDelete = ({ allStatus, mediaStatus, activeStatus, handleStatus, removeMedia }) => {
    const ref = useRef();
    const refIcon = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    const isAllOrSearch = (activeStatus === "All" || activeStatus === "Search")
    useOnClickOutside(ref, () => setToggleStatus(false), refIcon);


    return (
        <>
            <AddTooltip ref={refIcon} title="Change status">
                <span className="img-btn-top-left p-3" style={{margin: -10}} onClick={() => setToggleStatus(!toggleStatus)}>
                    <FaBars size={20}/>
                </span>
            </AddTooltip>

            <AddTooltip title="Delete media">
                <span className="img-btn-top-right p-3" style={{margin: -10}} onClick={removeMedia}>
                    <FaTrash size={18} />
                </span>
            </AddTooltip>

            {toggleStatus &&
                <div ref={ref} className={isAllOrSearch ? "edit-status-all" : "edit-status"}>
                    <select className="edit-status-drop" value={mediaStatus} onChange={handleStatus}>
                        {allStatus.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            }
        </>
    )
};


export default StatusAndDelete;