import React, {useState} from "react";

import LoadingIcon from "../primitives/LoadingIcon";
import useLoading from "@/stuff/hooks/LoadingHook";
import {zeroPad} from "@/stuff/utils/functions";


export default function EpsAndSeasons({ isEnabled, initSeason, initEpisode, epsPerSeason, updateSeas, updateEps }) {
    const [currentSeas, setCurrentSeas] = useState(initSeason);
    const [currentEps, setCurrentEps] = useState(initEpisode);
    const [isLoading, handleLoading] = useLoading();

    const seasons = [...Array(epsPerSeason.length).keys()].map(v => v + 1);
    const episodes = [...Array(epsPerSeason[currentSeas - 1]).keys()].map(v => v + 1);

    const handleSeason = async (ev) => {
        const newVal = parseInt(ev.target.value);
        const response = await handleLoading(updateSeas, newVal);

        if (response) {
            setCurrentSeas(newVal);
            setCurrentEps(1);
        }
    }
    const handleEpisode = async (ev) => {
        const newVal = parseInt(ev.target.value);
        const response = await handleLoading(updateEps, newVal);

        if (response) {
            setCurrentEps(newVal);
        }
    }


    return (
        <div className="supp-drop-container">
            {isLoading ?
                <LoadingIcon loading={true} size={5}/>
                :
                <>
                    {isEnabled ?
                        <>
                            <select className="supp-drop" value={currentSeas} onChange={handleSeason}>
                                {seasons.map(s =>
                                    <option key={s} className="supp-drop-opt" value={s}>
                                        S{zeroPad(s)}
                                    </option>
                                )}
                            </select>

                            <span style={{borderRight: "2px solid gray"}}></span>

                            <select className="supp-drop" value={currentEps} onChange={handleEpisode}>
                                {episodes.map(e =>
                                    <option key={e} className="supp-drop-opt" value={e}>
                                        E{zeroPad(e)}
                                    </option>
                                )}
                            </select>
                        </>
                        :
                        <div className="d-flex justify-content-evenly p-t-2">
                            <div>S{zeroPad(currentSeas)}</div>
                            <div style={{borderRight: "2px solid gray"}}></div>
                            <div>E{zeroPad(currentEps)}</div>
                        </div>
                    }
                </>
            }
        </div>
    )
}
