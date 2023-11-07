import React, {useRef, useState} from "react";

import {getMetricValues} from "../../utils/functions";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import LoadingIcon from "../primitives/LoadingIcon";
import {Tooltip} from "react-tooltip";
import {FeelingDropdown} from "../reused/FeelingDropdown";
import {useLoading} from "../../hooks/LoadingHook";


export default function MetricListDrop({ mediaId, isEnabled, name, initMetric, updateMetric }) {
    const ref = useRef();
    const metricValues = getMetricValues(name);
    const [metric, setMetric] = useState(initMetric);
    const [edit, setEdit] = useState(false);
    const [isLoading, handleLoading] = useLoading();
    useOnClickOutside(ref, () => setEdit(false));

    const handleSelect = async (value) => {
        const response = await handleLoading(updateMetric, value);
        if (response) {
            setMetric(value);
        }
        setEdit(false);
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
        }
        setEdit(false);
    };


    return (
        <div ref={ref}>
            {edit ?
                isLoading ?
                    <LoadingIcon loading={true} size={6}/>
                    :
                    name === "Feeling" ?
                        <FeelingDropdown
                            value={metric}
                            options={metricValues}
                            onSelect={handleSelect}
                            size={40}
                        />
                        :
                        <select className="metric-redo-drop" value={metric} onChange={handleSelectChange}>
                            {metricValues.map(val =>
                                <option key={val} className="supp-drop-opt" value={val}>
                                    {typeof val === "number" ? val.toFixed(1) : val}
                                </option>
                            )}
                        </select>
                :
                isLoading ?
                    <LoadingIcon loading={true} size={6}/>
                    :
                    name === "Feeling" ?
                        <>
                            <span id={"feeling-" + mediaId} className={isEnabled && "cu-p"} onClick={isEnabled && (() => setEdit(true))}>
                                {metric === null ? "---" : metricValues.find(item => item.value === metric)?.icon}
                            </span>
                            <Tooltip anchorId={"feeling-" + mediaId} content="Feeling"/>
                        </>
                        :
                        <>
                            <span id={"score-" + mediaId} className={isEnabled && "cu-p"} onClick={isEnabled && (() => setEdit(true))}>
                                {metric === null ? "---" : typeof metric === "number" ? metric.toFixed(1) : metric}
                            </span>
                            <Tooltip anchorId={"score-" + mediaId} content="Score"/>
                        </>
            }
        </div>
    );
}
