import React, {useState} from "react";

import {getRedoValues} from "../../../utils/functions";
import {useLoading} from "../../../hooks/LoadingHook";


export default function RedoDrop({ name, initRedo, updateRedo }) {
    const redoVals = getRedoValues();
    const [redo, setRedo] = useState(initRedo);
    const [isLoading, handleLoading] = useLoading();

    const handleRedo = async (ev) => {
        const newVal = ev.target.value;
        const response = await handleLoading(updateRedo, newVal);
        if (response) {
            setRedo(newVal);
        }
    };


    return (
        <div className="d-flex justify-content-between">
            <div className="fw-5">{name}</div>
            <select className="details-drop bg-card" value={redo} onChange={handleRedo}>
                {isLoading ?
                    <option>...</option>
                    :
                    redoVals.map(val => <option key={val}>{val}</option>)
                }
            </select>
        </div>
    )
}
