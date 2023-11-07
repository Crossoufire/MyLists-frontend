import React, {useEffect, useState} from "react";
import {Card, Row, Col} from "react-bootstrap";
import {PieChart} from "react-minimal-pie-chart";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";

import {getMetricValues} from "../../utils/functions";
import HLine from "../primitives/HLine";
import {Tooltip} from "react-tooltip";


export default function GlobalStats({ userData, global }) {
    const [caret, setCaret] = useState(FaCaretDown);
    const [isOpen, setIsOpen] = useState(true);
    const [chartPie, setChartPie] = useState([]);

    console.log(userData);

    useEffect(() => {
        const pieData = global.chart_colors.map((color, i) => ({
            value: global.chart_data[i],
            color: color,
        }));
        setChartPie(pieData);
    }, [global]);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight)
    }


    return (
        <Card className="bg-card text-light">
            <Card.Body className="p-3">
                <Card.Title className="cu-p" onClick={toggleCollapse}>
                    <div>{caret} &nbsp;Statistics</div>
                </Card.Title>
                <HLine/>
                {isOpen &&
                    <Row className="gy-3 align-items-center">
                        <Col sm={12} lg={12} xl={5} className="position-relative" style={{height: "200px"}}>
                            <PieChart
                                data={chartPie}
                                label={({ dataEntry }) =>
                                    Math.round(dataEntry.percentage) === 0 ? null :
                                        Math.round(dataEntry.percentage) + "%"}
                                labelStyle={{fontSize: "9px", fontFamily: "sans-serif"}}
                            />
                        </Col>
                        <Col sm={12} lg={12} xl={7} className="text-center">
                            <div className="d-flex flex-column gap-4">
                                {userData.add_feeling ?
                                    <>
                                        <div className="d-flex row-cols-3 fw-5 fs-18">
                                            <div id="global-total-time">
                                                <div style={{color: "rgb(138, 138, 138)"}}>Total time</div>
                                                <div>{global.total_hours} h</div>
                                                <Tooltip
                                                    anchorId="global-total-time"
                                                    content={(global.total_hours/24).toFixed(0)+ " days"}
                                                />
                                            </div>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Total Media</div>
                                                <div>{global.total_media}</div>
                                            </div>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Scored</div>
                                                <div>
                                                    {((global.total_media_scored * 100)/(global.total_media))
                                                        .toFixed(1)} %
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex fw-5 fs-18 justify-content-center" style={{gap: 35}}>
                                            {getMetricValues("Feeling").slice(1).reverse().map((f, idx) =>
                                                <div key={idx} className="text-center">
                                                    {f.icon}<br/>
                                                    {global.list_all_metric[global.list_all_metric.length - 1 - idx]}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="d-flex row-cols-2 fw-5 fs-18">
                                            <div id="global-total-time">
                                                <div style={{color: "rgb(138, 138, 138)"}}>Total time</div>
                                                <div>{global.total_hours} h</div>
                                                <Tooltip
                                                    anchorId="global-total-time"
                                                    content={(global.total_hours/24).toFixed(0)+ " days"}
                                                />
                                            </div>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Total Media</div>
                                                <div>{global.total_media}</div>
                                            </div>
                                        </div>
                                        <div className="d-flex row-cols-2 fw-5 fs-18">
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Percent Scored</div>
                                                <div>
                                                    {((global.total_media_scored * 100)/(global.total_media))
                                                        .toFixed(1)} %
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{color: "rgb(138, 138, 138)"}}>Mean Score</div>
                                                <div>{global.total_mean_score.toFixed(2)}/10</div>
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

