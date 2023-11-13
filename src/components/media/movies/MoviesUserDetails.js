import React, {useState} from "react";

import StatusDrop from "../general/StatusDrop";
import MetricDrop from "../general/MetricDrop";
import RedoDrop from "../general/RedoDrop";


export default function MoviesUserDetails({ userData, userMetric, updatesAPI }) {
    const [redo, setRedo] = useState(userData.rewatched);
    const [status, setStatus] = useState(userData.status);
    const [metric, setMetric] = useState(userMetric.value);

    const callbackStatus = (value) => {
        setStatus(value);
        setRedo(0);
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
            {status !== "Plan to Watch" &&
                <>
                    <MetricDrop
                        name={userMetric.name}
                        initMetric={metric}
                        updateMetric={updatesAPI.metric}
                        callbackMetric={callbackMetric}
                    />
                    <RedoDrop
                        name="Re-watched"
                        initRedo={redo}
                        updateRedo={updatesAPI.redo}
                    />
                </>
            }
        </>
    )
}
