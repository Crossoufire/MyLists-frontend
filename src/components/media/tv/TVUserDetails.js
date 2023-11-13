import React, {useState} from "react";

import MetricDrop from "../general/MetricDrop";
import RedoDrop from "../general/RedoDrop";
import StatusDrop from "../general/StatusDrop";
import EpsSeasonsDrop from "./EpsSeasonsDrop";


export default function TVUserDetails({ userData, userMetric, updatesAPI }) {
    const [redo, setRedo] = useState(userData.rewatched);
    const [status, setStatus] = useState(userData.status);
    const [metric, setMetric] = useState(userMetric.value);
    const [season, setSeason] = useState(userData.current_season);
    const [episode, setEpisode] = useState(userData.last_episode_watched);

    const callbackStatus = (value) => {
        setStatus(value);

        if (["Plan to Watch", "Random"].includes(value)) {
            setSeason(1);
            setEpisode(1);
        }

        if (value === "Completed") {
            setSeason(userData.eps_per_season.length);
            setEpisode(userData.eps_per_season[userData.eps_per_season.length - 1]);
        }

        setMetric(metric)
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
            {(status !== "Plan to Watch" && status !== "Random") &&
                <EpsSeasonsDrop
                    initSeason={season}
                    initEpisode={episode}
                    epsPerSeason={userData.eps_per_season}
                    updateSeason={updatesAPI.season}
                    updateEpisode={updatesAPI.episode}
                    isDisabled={status === "Completed"}
                />
            }
            {status !== "Plan to Watch" &&
                <MetricDrop
                    name={userMetric.name}
                    initMetric={metric}
                    updateMetric={updatesAPI.metric}
                    callbackMetric={callbackMetric}
                />
            }
            {status === "Completed" &&
                <RedoDrop
                    name="Re-watched"
                    initRedo={redo}
                    updateRedo={updatesAPI.redo}
                />
            }
        </>
    )
}
