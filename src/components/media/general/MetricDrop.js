import React, {useState} from "react";

import {getMetricValues} from "../../../utils/functions";
import {FeelingDropdown} from "../../reused/FeelingDropdown";
import useLoading from "../../../hooks/LoadingHook";


export default function MetricDrop({ name, initMetric, updateMetric, callbackMetric }) {
    const metricValues = getMetricValues(name);
    const [metric, setMetric] = useState(initMetric);
    const [isLoading, handleLoading] = useLoading();

    const handleSelect = async (value) => {
        const response = await handleLoading(updateMetric, value);
        if (response) {
            setMetric(value);
            callbackMetric(value);
        }
    }
    const handleSelectChange = async (ev) => {
        const newVal = ev.target.value;
        const response = await handleLoading(updateMetric, newVal);
        if (response) {
            if (newVal === "---") {
                setMetric(newVal);
            } else {
                setMetric(parseFloat(newVal));
            }
            callbackMetric(newVal);
        }
    };


    return (
        <>
            <hr className="m-l-0 m-r-auto m-t-12 m-b-10" style={{width: "99%"}}/>
            <div className="d-flex justify-content-between">
                <div className="fw-5">{name}</div>
                {name === "Feeling" ?
                    <FeelingDropdown
                        value={metric}
                        options={metricValues}
                        onSelect={handleSelect}
                    />
                    :
                    <select className="details-drop bg-card" value={metric} onChange={handleSelectChange}>
                        {isLoading ?
                            <option>...</option>
                            :
                            metricValues.map(val =>
                                <option key={val} value={val}>
                                    {typeof val === "number" ? val.toFixed(1) : val}
                                </option>
                            )
                        }
                    </select>
                }
            </div>
        </>
    )
}
