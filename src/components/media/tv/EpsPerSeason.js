import React from "react";

import HLine from "../../primitives/HLine";


export default function EpsPerSeason({ epsPerSeason }) {
    return (
        <div>
            <h4>Episodes/Seasons</h4>
            <HLine/>
            <div className="d-flex justify-content-start flex-wrap gap-3 eps-season-container">
                {epsPerSeason.map((val, idx) =>
                    <div key={idx} className="p-2 eps-season-box">
                        <div className="fw-5">Season {idx + 1}</div>
                        <div>{val} Eps</div>
                    </div>
                )}
            </div>
        </div>
    )
}
