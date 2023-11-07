import React, {useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import {FaBars, FaTrash} from "react-icons/fa";
import {Tooltip} from "react-tooltip";


export default function StatusAndDelete({ mediaId, allStatus, mediaStatus, activeStatus, handleStatus, removeMedia }) {
    const ref = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    useOnClickOutside(ref, () => setToggleStatus(false));


    return (
        <div>
            <FaBars
                id={"status-"+mediaId}
                size={20}
                className="img-btn-top-left"
                onClick={() => setToggleStatus(!toggleStatus)}
            />
            <Tooltip anchorId={"status-"+mediaId} content="Change status"/>
            <FaTrash
                id={"delete-"+mediaId}
                size={18}
                className="img-btn-top-right"
                onClick={removeMedia}
            />
            <Tooltip anchorId={"delete-"+mediaId} content="Delete media"/>
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
