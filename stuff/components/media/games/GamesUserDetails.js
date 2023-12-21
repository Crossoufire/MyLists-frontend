import React, {useState} from "react";

import StatusDrop from "../general/StatusDrop";
import MetricDrop from "../general/MetricDrop";
import PlaytimeDrop from "./PlaytimeDrop";


export default function GamesUserDetails({ userData, userMetric, updatesAPI }) {
    const [status, setStatus] = useState(userData.status);
    const [metric, setMetric] = useState(userMetric.value);
    const [playtime, setPlaytime] = useState(userData.playtime/60);

    const callbackStatus = (value) => {
        setStatus(value);

        if (value === "Plan to Play") {
            setPlaytime(0);
        }
    };
    const callbackMetric = (value) => {
        setMetric(value);
    }


    return (
        <>
            <StatusDrop
                initStatus={status}
                allStatus={userData.all_status}
                updateStatus={updatesAPI.status}
                callbackStatus={callbackStatus}
            />
            {status !== "Plan to Play" &&
                <>
                    <PlaytimeDrop
                        initPlaytime={playtime}
                        updatePlaytime={updatesAPI.playtime}
                    />
                    <MetricDrop
                        name={userMetric.name}
                        initMetric={metric}
                        updateMetric={updatesAPI.metric}
                        callbackMetric={callbackMetric}
                    />
                </>
            }
        </>
    )
}
