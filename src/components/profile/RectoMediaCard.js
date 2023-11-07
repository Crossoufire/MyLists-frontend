import {getMetricValues} from "../../utils/functions";
import {Tooltip} from "react-tooltip";
import React from "react";


export default function RectoMediaCard({ feeling, metric, mediaType }) {
    const maxValue = Math.max(...metric);

    return (
        <>
            {feeling ?
                <div className="fw-5">
                    <span>Media per feeling</span>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex fw-5 fs-18 justify-content-center gap-5">
                            {getMetricValues("Feeling").slice(1).reverse().map((f, idx) =>
                                <div key={idx} className="text-center">
                                    {f.icon}<br/>{metric[metric.length - 1 - idx]}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div className="fw-5">
                    <span>Media per Score / 10</span>
                    <ul className="histogram">
                        {metric.map((val, idx) =>
                            <React.Fragment key={idx+mediaType}>
                                <li id={idx+mediaType} className={"histogram-item bg-"+mediaType}
                                    style={{height: `calc(${(val / maxValue) * 100}% + 1px)`}}/>
                                <Tooltip
                                    anchorId={idx+mediaType}
                                    content={`${(idx / 2)} / 10: ${val} ${mediaType}`}
                                />
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            }
        </>
    );
}