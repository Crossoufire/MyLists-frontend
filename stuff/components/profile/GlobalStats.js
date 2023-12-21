"use client";
import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

import {getMetricValues} from "@/stuff/utils/functions";
import HLine from "../primitives/HLine";
import AddTooltip from "../primitives/AddTooltip";
import useCollapse from "@/stuff/hooks/CollapseHook";


export default function GlobalStats({ userData, global }) {
    const [chartPie, setChartPie] = useState([]);
    const { isOpen, caret, toggleCollapse } = useCollapse();


    useEffect(() => {
        setChartPie(global.time_per_media.map(value => ({ value })));
    }, [global]);

    const customLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        const displayLabel = percent > 15 / 360;

        return (
            <>
                {displayLabel &&
                    <text x={x} y={y} fill="black" className="fw-5" textAnchor="middle" dominantBaseline="middle">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                }
            </>
        );
    };


    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="cu-p" onClick={toggleCollapse}>
                    <div>{caret} &nbsp;Statistics</div>
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <Row className="gy-3 align-items-center">
                        <Col sm={12} lg={12} xl={5}>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={chartPie} dataKey="value" stroke="black" isAnimationActive={false}
                                         label={customLabel} labelLine={false} outerRadius={100}>
                                        {global.color_per_media.map((color, idx) =>
                                            <Cell key={`cell-${idx}`} fill={color}/>
                                        )}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col sm={12} lg={12} xl={7} className="text-center">
                            <div className="d-flex flex-column gap-4">
                                {userData.add_feeling ?
                                    <>
                                        <div className="d-flex row-cols-3 fw-5 fs-18">
                                            <AddTooltip title={`${global.total_days} days`}>
                                                <div>
                                                    <div className="text-gloom">Total time</div>
                                                    <div>{global.total_hours} h</div>
                                                </div>
                                            </AddTooltip>
                                            <div>
                                                <div className="text-gloom">Total Media</div>
                                                <div>{global.total_media}</div>
                                            </div>
                                            <AddTooltip title={`${global.total_scored}/${global.total_media}`}>
                                                <div>
                                                    <div className="text-gloom">Scored</div>
                                                    <div>{global.percent_scored.toFixed(1)} %</div>
                                                </div>
                                            </AddTooltip>
                                        </div>
                                        <div className="d-flex fw-5 fs-18 justify-content-center" style={{gap: 35}}>
                                            {getMetricValues("Feeling").slice(1).reverse().map((f, idx) =>
                                                <div key={idx} className="text-center">
                                                    {f.icon}<br/>{global.count_per_feeling[idx]}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="d-flex row-cols-2 fw-5 fs-18">
                                            <AddTooltip title={`${global.total_days} days`}>
                                                <div>
                                                    <div className="text-gloom">Total time</div>
                                                    <div>{global.total_hours} h</div>
                                                </div>
                                            </AddTooltip>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Total Media</div>
                                                <div>{global.total_media}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex row-cols-2 fw-5 fs-18">
                                            <AddTooltip title={`${global.total_scored}/${global.total_media}`}>
                                                <div>
                                                    <div className="text-gloom">Percent Scored</div>
                                                    <div>{global.percent_scored.toFixed(1)} %</div>
                                                </div>
                                            </AddTooltip>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Mean Score</div>
                                                <div>{global.mean_score.toFixed(2)}/10</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                }
            </Card.Body>
        </Card>
    );
}

