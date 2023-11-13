import React, {useState} from "react";

import StatusDrop from "../general/StatusDrop";
import MetricDrop from "../general/MetricDrop";
import RedoDrop from "../general/RedoDrop";
import PageInput from "./PageInput";


export default function BooksUserDetails({ userData, userMetric, totalPages, updatesAPI }) {
    const [redo, setRedo] = useState(userData.rewatched);
    const [status, setStatus] = useState(userData.status);
    const [metric, setMetric] = useState(userMetric.value);
    const [page, setPage] = useState(userData.actual_page);

    const callbackStatus = (value) => {
        setStatus(value);

        if (value === "Completed") {
            setPage(totalPages);
        }

        if (value === "Plan to Read") {
            setPage(0);
        }

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
            {status !== "Plan to Read" &&
                <>
                    <PageInput
                        initPage={page}
                        totalPages={totalPages}
                        updatePage={updatesAPI.page}
                        isDisabled={status === "Completed"}
                    />
                    <MetricDrop
                        name={userMetric.name}
                        initMetric={metric}
                        updateMetric={updatesAPI.metric}
                        callbackMetric={callbackMetric}
                    />
                </>
            }
            {status === "Completed" &&
                <RedoDrop
                    name="Re-read"
                    initRedo={redo}
                    updateRedo={updatesAPI.redo}
                />
            }
        </>
    )
}
