import React, {useState} from "react";

import {getPlaytimeValues} from "../../../utils/functions";
import useLoading from "../../../hooks/LoadingHook";


export default function PlaytimeDrop({ initPlaytime, updatePlaytime }) {
    const playValues = getPlaytimeValues();
    const [playtime, setPlaytime] = useState(initPlaytime);
    const [isLoading, handleLoading] = useLoading();

    const handleSelect = async (ev) => {
        const newVal = ev.target.value;
        const response = await handleLoading(updatePlaytime, newVal);
        if (response) {
            setPlaytime(newVal);
        }
    };


    return (
        <div className="d-flex justify-content-between fw-5">
            <div>Playtime</div>
            <select className="details-drop bg-card" value={playtime} onChange={handleSelect}>
                {isLoading ?
                    <option>...</option>
                    :
                    playValues.map(p => <option key={p} value={p}>{p} hours</option>)
                }
            </select>
        </div>
    );
}
