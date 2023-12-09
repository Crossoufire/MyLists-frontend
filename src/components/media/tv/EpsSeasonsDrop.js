import React, {useEffect, useState} from "react";
import useLoading from "../../../hooks/LoadingHook";


export default function EpsSeasonsDrop({ initSeason, initEpisode, epsPerSeason, updateSeason, updateEpisode, isDisabled }) {
    const [season, setSeason] = useState(initSeason);
    const [episode, setEpisode] = useState(initEpisode);
    const [loadFromEps, setLoadFromEps] = useState(false);
    const [isLoading, handleLoading] = useLoading();
    const seasons = [...Array(epsPerSeason.length).keys()].map(v=>v+1);
    const episodes = [...Array(epsPerSeason[season-1]).keys()].map(v=>v+1);

    useEffect(() => {
        setSeason(initSeason);
        setEpisode(initEpisode);
    }, [initSeason, initEpisode]);

    const handleSeason = async (ev) => {
        const newVal = parseInt(ev.target.value);
        const response = await handleLoading(updateSeason, newVal);
        if (response) {
            setSeason(newVal);
            setEpisode(1);
        }
    }
    const handleEpisode = async (ev) => {
        const newVal = parseInt(ev.target.value);
        setLoadFromEps(true);
        const response = await handleLoading(updateEpisode, newVal);
        if (response) {
            setEpisode(newVal);
        }
        setLoadFromEps(false);
    }


    return (
        <>
            <div className="d-flex justify-content-between fw-5">
                <div>Season</div>
                <select className="details-drop bg-card" value={season} onChange={handleSeason} disabled={isDisabled}>
                    {isLoading && !loadFromEps ?
                        <option>...</option>
                        :
                        seasons.map(s => <option key={s}>{s}</option>)
                    }
                </select>
            </div>
            <div className="d-flex justify-content-between fw-5">
                <div>Episode</div>
                <select className="details-drop bg-card" value={episode} onChange={handleEpisode} disabled={isDisabled}>
                    {isLoading ?
                        <option>...</option>
                        :
                        episodes.map(e => <option key={e}>{e}</option>)
                    }
                </select>
            </div>
        </>
    )
}

