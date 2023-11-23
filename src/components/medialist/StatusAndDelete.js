import React, {useRef, useState} from "react";
import {FaBars, FaTrash} from "react-icons/fa";

import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import AddTooltip from "../primitives/AddTooltip";


export default function StatusAndDelete({ mediaId, allStatus, mediaStatus, activeStatus, handleStatus, removeMedia }) {
    const ref = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    useOnClickOutside(ref, () => setToggleStatus(false));


    return (
        <div>
            <AddTooltip title={"Change status"} cn={"img-btn-top-left"} addSpan>
                <FaBars size={20} onClick={() => setToggleStatus(!toggleStatus)}/>
            </AddTooltip>
            <AddTooltip title={"Delete media"} cn={"img-btn-top-right"} addSpan>
                <FaTrash size={18} onClick={removeMedia}/>
            </AddTooltip>
            {toggleStatus &&
                <div ref={ref} className={activeStatus === "All" ? "edit-status-all" : "edit-status"}>
                    <select className="edit-status-drop" value={mediaStatus} onChange={handleStatus}>
                        {allStatus.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            }
        </div>
    )
}
