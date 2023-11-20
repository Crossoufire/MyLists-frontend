import React from "react";
import {Tooltip} from "react-tooltip";
import {getMetricValues} from "../../utils/functions";


export default function MetricDistribution({ isFeeling, metricCount, mediaType }) {
    const maxValue = Math.max(...metricCount);
    const metricName = isFeeling ? "Feeling" : "Score";

    return (
        <div>
            <div className="fw-5 fs-18">{metricName} distribution</div>
            {maxValue === 0 ?
                <div className="text-grey m-t-10">
                    <i>No {metricName.toLowerCase()} added yet</i>
                </div>
                :
                isFeeling ?
                    <div className="d-flex flex-column gap-4 m-t-5">
                        <div className="d-flex fw-5 fs-18 justify-content-center gap-5">
                            {getMetricValues("Feeling").slice(1).reverse().map((f, idx) =>
                                <div key={idx} className="text-center">
                                    {f.icon}<br/>{metricCount[metricCount.length - 1 - idx]}
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <ul className="histogram">
                        {metricCount.map((val, idx) =>
                            <React.Fragment key={idx + mediaType}>
                                <li
                                    id={idx + mediaType}
                                    className={`histogram-item bg-${mediaType}`}
                                    style={{height: `calc(${(val / maxValue) * 100}% + 1px)`}}
                                />
                                <Tooltip
                                    style={{zIndex: 5}}
                                    anchorId={idx + mediaType}
                                    content={`${(idx / 2)}/10: ${val} ${mediaType}`}
                                />
                            </React.Fragment>
                        )}
                    </ul>
            }
        </div>
    );
}