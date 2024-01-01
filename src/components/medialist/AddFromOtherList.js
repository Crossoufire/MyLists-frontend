import React, {useRef, useState} from "react";
import {FaPlus} from "react-icons/fa";

import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import AddTooltip from "../primitives/AddTooltip";


export default function AddFromOtherList({ allStatus, activeStatus, handleAddFromOtherList }) {
    const ref = useRef();
    const refIcon = useRef();
    const [toggleStatus, setToggleStatus] = useState(false);
    const isAllOrSearch = (activeStatus === "All" || activeStatus === "Search")
    useOnClickOutside(ref, () => setToggleStatus(false), refIcon);


    return (
        <>
            <AddTooltip ref={refIcon} title="Add to your list">
                <span className="img-btn-top-left p-3" style={{margin: -10}} onClick={() => setToggleStatus(!toggleStatus)}>
                    <FaPlus size={20}/>
                </span>
            </AddTooltip>

            {toggleStatus &&
                <div ref={ref} className={isAllOrSearch ? "edit-status-all" : "edit-status"}>
                    <select className="edit-status-drop" onChange={handleAddFromOtherList}>
                        <option>--- Select status ---</option>
                        {allStatus.map(status => <option key={status}>{status}</option>)}
                    </select>
                </div>
            }
        </>
    );
}