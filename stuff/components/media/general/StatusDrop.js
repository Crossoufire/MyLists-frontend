import React, {useState} from "react";

import useLoading from "@/stuff/hooks/LoadingHook";


export default function StatusDrop({ initStatus, allStatus, updateStatus, callbackStatus }) {
    const [status, setStatus] = useState(initStatus)
    const [isLoading, handleLoading] = useLoading();

    const handleStatus = async (ev) => {
        const newValue = ev.target.value;
        const response = await handleLoading(updateStatus, newValue);
        if (response) {
            setStatus(newValue);
            callbackStatus(newValue);
        }
    };

    return (
        <div className="d-flex justify-content-between fw-5">
            <div>Status</div>
            <select className="details-drop bg-card" value={status} onChange={handleStatus} disabled={isLoading}>
                {isLoading ?
                    <option>...</option>
                    :
                    allStatus.map(s => <option key={s}>{s}</option>)
                }
            </select>
        </div>
    )
}
