import React, {useRef, useState} from "react";
import {getPlaytimeValues} from "../../utils/functions";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";


export default function PlaytimeDrop({ isEnabled, initPlaytime, updatePlaytime }) {
    const ref = useRef();
    const playValues = getPlaytimeValues();
    const [edit, setEdit] = useState(false);
    const [playtime, setPlaytime] = useState(initPlaytime/60);
    useOnClickOutside(ref, () => setEdit(false));

    const handlePlaytime = (ev) => {
        setPlaytime(ev.target.value);
        setEdit(false);
        updatePlaytime(ev.target.value);
    }

    return (
        <div ref={ref} className="supp-drop-container">
            {edit ?
                <select className="supp-drop" value={playtime} onChange={handlePlaytime}>
                    {playValues.map(p => <option key={p} className="supp-drop-opt" value={p}>{p} hours</option>)}
                </select>
                :
                <span className={isEnabled && "cu-p"} onClick={isEnabled && (() => setEdit(true))}>
					{playtime} hours
				</span>
            }
        </div>
    )
}
