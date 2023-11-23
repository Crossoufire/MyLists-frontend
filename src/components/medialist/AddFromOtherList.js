import React, {useRef, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import AddTooltip from "../primitives/AddTooltip";


export default function AddFromOtherList({ mediaId, allStatus, activeStatus, handleAddFromOtherList }) {
    const ref = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    useOnClickOutside(ref, () => setToggleStatus(false));


    return (
        <>
            <AddTooltip title={"Add to your list"}>
                <span>
                    <FaPlus size={20} className="img-btn-top-left" onClick={() => setToggleStatus(!toggleStatus)}/>
                </span>
            </AddTooltip>

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