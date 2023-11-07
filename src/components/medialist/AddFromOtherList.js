import React, {useRef, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {Tooltip} from "react-tooltip";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";


export default function AddFromOtherList({ mediaId, allStatus, activeStatus, handleAddFromOtherList }) {
    const ref = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    useOnClickOutside(ref, () => setToggleStatus(false));


    return (
        <>
            <FaPlus
                id={"add-to-"+mediaId}
                size={20}
                className="img-btn-top-left"
                onClick={() => setToggleStatus(!toggleStatus)}
            />
            <Tooltip anchorId={"add-to-"+mediaId} content="Add to your list"/>

            {toggleStatus &&
                <div ref={ref} className={activeStatus === "All" ? "edit-status-all" : "edit-status"}>
                    <select className="edit-status-drop" onChange={handleAddFromOtherList}>
                        <option>--- Select status ---</option>
                        {allStatus.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            }
        </>
    );
}