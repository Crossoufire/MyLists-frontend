import React, {useRef, useState} from "react";
import {Tooltip} from "react-tooltip";

import {getRedoValues} from "../../utils/functions";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import LoadingIcon from "../primitives/LoadingIcon";
import useLoading from "../../hooks/LoadingHook";


export default function RedoListDrop({ mediaId, isEnabled, initRedo, updateRedo }) {
    const ref = useRef();
    const redoValues = getRedoValues();
    const [redo, setRedo] = useState(initRedo);
    const [edit, setEdit] = useState(false);
    const [isLoading, handleLoading] = useLoading();
    useOnClickOutside(ref, () => setEdit(false));

    const handleSelectChange = async (ev) => {
        const newVal = ev.target.value;
        const response = await handleLoading(updateRedo, newVal);
        if (response) {
            setRedo(newVal);
        }
        setEdit(false);
    };


    return (
        <div ref={ref}>
            {edit ?
                isLoading ?
                    <LoadingIcon loading={true} size={6}/>
                    :
                    <>
                        <select className="metric-redo-drop" value={redo} onChange={handleSelectChange}>
                            {redoValues.map(r => <option key={r} className="supp-drop-opt">{r}</option>)}
                        </select>
                    </>
                :
                isLoading ?
                    <LoadingIcon loading={true} size={6}/>
                    :
                    <>
                        <span id={"redo-"+mediaId} className={isEnabled && "cu-p"} onClick={isEnabled && (() => setEdit(true))}>
                            {redo}
                        </span>
                        <Tooltip anchorId={"redo-"+mediaId} content={"Redo"}/>
                    </>
            }
        </div>
    );
}
